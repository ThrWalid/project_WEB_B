export interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  teacherId: string;
  teacherName: string;
  category: string;
  level: CourseLevel;
  duration: number; // en heures
  maxStudents: number;
  enrolledStudents: string[];
  resources: CourseResource[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  progress?: number; // Progression de l'étudiant pour ce cours (0-100)
}

export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export interface CourseResource {
  id: string;
  name: string;
  type: ResourceType;
  url: string;
  size?: number;
}

export enum ResourceType {
  PDF = 'pdf',
  VIDEO = 'video',
  IMAGE = 'image',
  DOCUMENT = 'document',
  LINK = 'link'
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  content: string;
  category: string;
  level: CourseLevel;
  duration: number;
  maxStudents: number;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  id: string;
} 