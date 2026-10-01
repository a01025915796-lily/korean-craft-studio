import type { CraftClass } from "@/types";

export const classes: readonly CraftClass[] = [
  {
    id: "wheel-pottery",
    name: "물레 성형 도자기 원데이 클래스",
    category: "도자기",
    description:
      "물레 위에서 흙을 올리고 세워 나만의 밥그릇 하나를 빚습니다. 초벌과 유약 작업은 공방에서 마무리해 드립니다.",
    price: 55000,
    durationMinutes: 150,
    capacity: 6,
    image: {
      src: "/images/classes/wheel-pottery.svg",
      alt: "물레 위에서 둥근 그릇을 빚는 모습을 단순하게 그린 일러스트",
    },
  },
  {
    id: "bojagi-patchwork",
    name: "조각보 보자기 만들기",
    category: "보자기",
    description:
      "자투리 천을 이어 붙여 작은 조각보 보자기를 만듭니다. 바느질이 처음이어도 차근차근 안내해 드립니다.",
    price: 45000,
    durationMinutes: 120,
    capacity: 8,
    image: {
      src: "/images/classes/bojagi-patchwork.svg",
      alt: "여러 색 천 조각을 이어 붙인 조각보를 단순하게 그린 일러스트",
    },
  },
  {
    id: "najeon-keyring",
    name: "나전 키링 만들기",
    category: "나전칠기",
    description:
      "자개 조각을 골라 배치하고 옻칠 느낌의 바탕에 붙여 작은 키링을 완성합니다. 소규모로 진행해 집중해서 만들 수 있습니다.",
    price: 38000,
    durationMinutes: 90,
    capacity: 4,
    image: {
      src: "/images/classes/najeon-keyring.svg",
      alt: "작은 자개 조각이 놓인 둥근 키링을 단순하게 그린 일러스트",
    },
  },
];
