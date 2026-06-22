import type { CollectionConfig } from 'payload'

export const Fragments: CollectionConfig = {
  slug: 'fragments',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'durationMin', 'isPublished'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'durationMin',
      type: 'select',
      options: [
        { label: '1 分钟', value: '1' },
        { label: '2 分钟', value: '2' },
        { label: '3 分钟', value: '3' },
        { label: '5 分钟', value: '5' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: '呼吸', value: 'breath' },
        { label: '五感', value: 'sense' },
        { label: '身体', value: 'body' },
        { label: '心念', value: 'mind' },
      ],
    },
    {
      name: 'hook',
      type: 'textarea',
      admin: { description: '列表中显示的一句引子' },
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'step',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
