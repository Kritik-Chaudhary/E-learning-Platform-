
import Layout from '../components/Layout'
import CourseCard from '../components/CourseCard'
import coursesData from '../data/courses.json'
import { useRouter } from 'next/router'

export default function Browse() {
  const router = useRouter()
  const { cat } = router.query
  const courses = coursesData.courses
  return (
    <Layout title="Browse">
      <h1 className="text-2xl font-bold mb-4">Browse Courses</h1>
      <div className="mb-4 text-sm text-gray-600">Showing {courses.length} courses{cat ? ` — filtered: ${cat}` : ''}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => <CourseCard key={c.id} course={c} />)}
      </div>
    </Layout>
  )
}
