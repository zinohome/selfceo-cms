import type { CollectionConfig } from 'payload'

export const RelationshipScenarios: CollectionConfig = {
  slug: 'relationship-scenarios',
  access: {
    read: ({ req: { user } }) => user ? true : { isPublished: { equals: true } },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'group', 'isPublished', 'sortOrder'],
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
      name: 'group',
      type: 'select',
      options: [
        { label: '💞 伴侣', value: 'partner' },
        { label: '🌿 父母', value: 'parents' },
        { label: '🏢 同事', value: 'colleague' },
        { label: '🤝 朋友', value: 'friend' },
      ],
    },
    {
      name: 'prompt',
      type: 'textarea',
      required: true,
      admin: { description: '点击场景后传给小研 AI 的预设 prompt' },
      access: {
        read: ({ req: { user } }) => Boolean(user),
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
