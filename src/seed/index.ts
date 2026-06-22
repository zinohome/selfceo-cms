import { getPayload } from 'payload'
import config from '@payload-config'
import { meditationsData, coursesData, fragmentsData, scenariosData } from './data'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 开始 seed...')

  // 检查现有数据（避免重复）
  const existingMeditations = await payload.find({ collection: 'meditations', limit: 0 })
  if (existingMeditations.totalDocs > 0) {
    console.log('⚠️  数据库已有内容，跳过 seed（避免重复）。删除数据后再运行。')
    process.exit(0)
  }

  // 创建冥想
  console.log('创建 6 条冥想...')
  for (const item of meditationsData) {
    await payload.create({ collection: 'meditations', data: item })
  }

  // 创建课程
  console.log('创建 5 门课程...')
  for (const item of coursesData) {
    await payload.create({ collection: 'courses', data: item })
  }

  // 创建碎片
  console.log('创建 8 条碎片微练习...')
  for (const item of fragmentsData) {
    await payload.create({ collection: 'fragments', data: item })
  }

  // 创建关系场景
  console.log('创建 12 个关系教练场景...')
  for (const item of scenariosData) {
    await payload.create({ collection: 'relationship-scenarios', data: item })
  }

  console.log('✅ Seed 完成！')
  console.log(`  冥想: ${meditationsData.length} 条`)
  console.log(`  课程: ${coursesData.length} 门`)
  console.log(`  碎片: ${fragmentsData.length} 条`)
  console.log(`  关系场景: ${scenariosData.length} 个`)

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed 失败:', err)
  process.exit(1)
})
