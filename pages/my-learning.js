
import Layout from '../components/Layout'
import coursesData from '../data/courses.json'
import React from 'react'
import ProgressBar from '../components/ProgressBar'

export default function MyLearning() {
  const [enrolled, setEnrolled] = React.useState([])
  const [progress, setProgress] = React.useState({})

  React.useEffect(() => {
    const e = []
    const p = {}
    coursesData.courses.forEach(course => {
      if (localStorage.getItem('enroll_' + course.id) === 'true') {
        e.push(course.id)
        p[course.id] = JSON.parse(localStorage.getItem('progress_' + course.id) || '[]')
      }
    })
    setEnrolled(e)
    setProgress(p)
  }, [])

  const enrolledCourses = coursesData.courses.filter(c => enrolled.includes(c.id))

  return (
    <Layout title="My Learning">
      <h1 className="text-2xl font-bold mb-6">My Learning</h1>
      {enrolledCourses.length === 0 ? <div className="text-gray-600">You are not enrolled in any courses yet.</div> : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {enrolledCourses.map(course => {
          const saved = progress[course.id] || []
          const pct = Math.round((saved.length / course.lessons.length) * 100)
          return (
            <div key={course.id} className="p-4 border rounded">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold">{course.title}</div>
                  <div className="text-sm text-gray-500">{saved.length} / {course.lessons.length} lessons completed</div>
                </div>
                <a href={`/course/${course.id}`} className="text-indigo-600 text-sm">Open course</a>
              </div>
              <ProgressBar percent={pct} />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
