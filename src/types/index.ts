export type CraftCategory = "도자기" | "나전칠기" | "보자기" | "목공예" | "한지" | "유기";

export type TabId = "crafts" | "classes";

export interface CraftImage {
  /** public/ 기준 경로. 예: "/images/crafts/celadon-bowl.svg" */
  src: string;
  /** 이미지 내용을 설명하는 대체 텍스트 */
  alt: string;
}

export interface Craft {
  id: string;
  name: string;
  category: CraftCategory;
  description: string;
  /** 원 단위 정수 */
  price: number;
  image: CraftImage;
}

export interface CraftClass {
  id: string;
  name: string;
  category: CraftCategory;
  description: string;
  /** 1인 기준, 원 단위 정수 */
  price: number;
  durationMinutes: number;
  /** 최대 인원 (신청 인원 상한) */
  capacity: number;
  image: CraftImage;
}

export interface OrderInquiry {
  craftId: string;
  name: string;
  phone: string;
  quantity: number;
  request: string;
}

export interface ClassApplication {
  classId: string;
  name: string;
  phone: string;
  /** "YYYY-MM-DD" */
  preferredDate: string;
  headcount: number;
  request: string;
}

export type MockApiResult =
  | { success: true; receiptNumber: string; message: string }
  | { success: false; message: string };

export type SubmitStatus = "idle" | "loading" | "success" | "error";

export type FieldErrors<T> = Partial<Record<keyof T, string>>;
