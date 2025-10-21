import type { IComment } from '@/types/comment'
import type { IUserInfo } from '@/types/userInfo'

export interface IPostListItem {
  id: number
  title: string
  photo?: string
  excerpt: string
  place: string
}

export interface IPost {
  id: number
  title: string
  description: string
  country: string
  city: string
  photo?: string
  comments?: IComment[]
  userInfo: IUserInfo
}
