"use client";

import { useMemo } from "react";
import { useCopilotReadable } from "@copilotkit/react-core";

export function CopilotPageData({ projects, news, spaces }: { projects?: any[]; news?: any[]; spaces?: any[] }) {
  const projectData = useMemo(() =>
    projects?.length
      ? projects.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          location: p.location,
          area: p.area,
          description: p.description?.substring(0, 200),
          type: p.type,
          category: p.category,
          isFeatured: p.isFeatured,
        }))
      : [],
    [projects]
  );

  const newsData = useMemo(() =>
    news?.length
      ? news.map((n) => ({
          id: n.id,
          title: n.title,
          excerpt: n.excerpt?.substring(0, 150),
          category: n.category,
          date: n.date,
        }))
      : [],
    [news]
  );

  const spaceData = useMemo(() =>
    spaces?.length
      ? spaces.map((s) => ({
          id: s.id,
          title: s.title,
          subtitle: s.subtitle,
          collection: s.collection,
          category: s.category,
        }))
      : [],
    [spaces]
  );

  useCopilotReadable({
    description: "Danh sách bất động sản đang có trên sàn",
    value: projectData,
  });

  useCopilotReadable({
    description: "Tin tức thị trường bất động sản",
    value: newsData,
  });

  useCopilotReadable({
    description: "Bộ sưu tập không gian nội thất",
    value: spaceData,
  });

  return null;
}
