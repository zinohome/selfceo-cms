import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'durationDays', 'isPremium', 'isPublished'],
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
        { label: '正念', value: 'mindfulness' },
        { label: '认知行为疗法(CBT)', value: 'CBT' },
        { label: '接受承诺疗法(ACT)', value: 'ACT' },
        { label: '失眠CBT(CBT-I)', value: 'CBT-I' },
        { label: '正念认知疗法(MBCT)', value: 'MBCT' },
      ],
    },
    {
      name: 'durationDays',
      type: 'number',
      admin: { description: '课程总天数' },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isPremium',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: '勾选后需要会员订阅才能访问' },
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
