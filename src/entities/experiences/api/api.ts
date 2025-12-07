import { supabase } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async (): Promise<ExperienceType[]> => {
      const { data, error } = await supabase.from("experiences").select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minute cache
    gcTime: 10 * 60 * 1000, // 10 minute garbage collection
  });
};
