export interface Task
{
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date | null;
}