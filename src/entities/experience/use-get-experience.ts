import { supabase } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

const getExperienceById = async (id: string) => await supabase.from("experiences").select("*").eq("id", id).single();

export const useGetExperienceById = (id: string) =>
  useQuery({
    queryKey: ["experience", id],
    queryFn: () => getExperienceById(id),
    enabled: !!id,
  });
