import type { CollectionConfig } from 'payload'

export const CourseLessons: CollectionConfig = {
  slug: 'course-lessons',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'course', 'order', 'durationMin'],
  },
  fields: [
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      admin: { description: '所属课程' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: { description: '课时顺序（从 1 开始）' },
    },
    {
      name: 'content',
      type: 'richText',
      admin: { description: '课时正文内容（Markdown/富文本）' },
    },
    {
      name: 'audio',
      type: 'upload',
      relationTo: 'media',
      admin: { description: '课时音频（可选）' },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      admin: { description: '课时视频（可选）' },
    },
    {
      name: 'durationMin',
      type: 'number',
      admin: { description: '预计学习时长（分钟）' },
    },
  ],
}
