import type { CollectionConfig } from 'payload'

export const Meditations: CollectionConfig = {
  slug: 'meditations',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'durationMin', 'isPublished', 'sortOrder'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: '专注', value: 'focus' },
        { label: '减压', value: 'stress' },
        { label: '睡眠', value: 'sleep' },
        { label: '呼吸', value: 'breathing' },
        { label: '身体扫描', value: 'body_scan' },
      ],
    },
    {
      name: 'durationMin',
      type: 'number',
      required: true,
      admin: { description: '冥想时长（分钟）' },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      admin: { description: '封面图片' },
    },
    {
      name: 'audio',
      type: 'upload',
      relationTo: 'media',
      admin: { description: '引导音频（mp3/m4a），无音频时使用 script 字段' },
    },
    {
      name: 'script',
      type: 'array',
      admin: { description: '文字引导步骤（无音频时使用）' },
      fields: [
        {
          name: 'step',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: '勾选后在前台可见' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { description: '越小越靠前' },
    },
  ],
}
