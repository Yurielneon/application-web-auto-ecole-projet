export interface Course {
    id: number;
    name: string;
    type: "common" | "specific";
    file_path: string;
    created_at?: string;
    updated_at?: string;
}