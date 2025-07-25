import { useState } from "react";
import { ProjectItem } from "../types/projects";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useProjects = () => {
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  const fetchProjects = async (): Promise<ProjectItem[]> => {
    setProjectsLoading(true);
    setProjectsError(null);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }

      setProjects(data || []);
      return data || [];
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setProjectsError("Failed to fetch projects");
      return [];
    } finally {
      setProjectsLoading(false);
    }
  };

  return {
    projects,
    fetchProjects,
    projectsLoading,
    projectsError,
  };
};
