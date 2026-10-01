import type { Craft } from "@/types";

export const crafts: readonly Craft[] = [
  {
    id: "baekja-moon-jar",
    name: "백자 달항아리",
    category: "도자기",
    description:
      "보름달을 닮은 둥근 어깨선이 특징인 백자 항아리입니다. 은은한 유백색 유약이 공간을 차분하게 채워 줍니다.",
    price: 280000,
    image: {
      src: "/images/crafts/baekja-moon-jar.svg",
      alt: "아이보리색 배경 위에 놓인 둥글고 하얀 달항아리",
    },
  },
  {
    id: "najeon-jewelry-box",
    name: "나전 칠기 보석함",
    category: "나전칠기",
    description:
      "검은 옻칠 위에 자개를 정성껏 박아 넣은 작은 보석함입니다. 빛에 따라 은은한 무지갯빛이 번집니다.",
    price: 195000,
    image: {
      src: "/images/crafts/najeon-jewelry-box.svg",
      alt: "검은 옻칠 상자 뚜껑 위에 자개 꽃 장식이 반짝이는 보석함",
    },
  },
  {
    id: "jogakbo-runner",
    name: "조각보 테이블 러너",
    category: "보자기",
    description:
      "자투리 천을 이어 붙여 만든 조각보 러너입니다. 식탁과 협탁 어디에나 은은한 색의 리듬을 더해 줍니다.",
    price: 68000,
    image: {
      src: "/images/crafts/jogakbo-runner.svg",
      alt: "연한 색 천 조각을 격자로 이어 붙인 조각보 러너",
    },
  },
  {
    id: "pine-tea-table",
    name: "소나무 찻상",
    category: "목공예",
    description:
      "소나무 결을 그대로 살려 짜 맞춘 작은 찻상입니다. 못 없이 맞춤 이음으로 만들어 오래 쓸수록 깊은 색이 납니다.",
    price: 158000,
    image: {
      src: "/images/crafts/pine-tea-table.svg",
      alt: "나뭇결이 보이는 소나무 재질의 직사각형 찻상",
    },
  },
  {
    id: "hanji-lamp",
    name: "한지 무드등",
    category: "한지",
    description:
      "여러 겹의 한지를 덧붙여 빛을 부드럽게 퍼뜨리는 탁상 조명입니다. 켜면 따뜻한 달빛 같은 분위기가 납니다.",
    price: 89000,
    image: {
      src: "/images/crafts/hanji-lamp.svg",
      alt: "따뜻한 빛이 은은하게 번지는 둥근 한지 무드등",
    },
  },
  {
    id: "yugi-bowl-set",
    name: "방짜 유기 공기 세트",
    category: "유기",
    description:
      "놋쇠를 두드려 만든 유기 공기 두 개 한 벌입니다. 따뜻한 황동빛이 상차림을 단정하게 만들어 줍니다.",
    price: 124000,
    image: {
      src: "/images/crafts/yugi-bowl-set.svg",
      alt: "황동빛으로 빛나는 유기 공기 두 개",
    },
  },
];
