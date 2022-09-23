export interface Post {
    id: number,
    title: string,
    description: string,
    status: number,
    createdUserId: number,
    updatedUserId: number,
    deletedUserId: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}
