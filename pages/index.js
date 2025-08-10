
import Layout from '../components/Layout'
import CourseCard from '../components/CourseCard'
import coursesData from '../data/courses.json'
import React from 'react'

export default function Home() {
  const courses = coursesData.courses.slice(0,6)
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Featured Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => <CourseCard key={c.id} course={c} />)}
      </div>
    </Layout>
  )
}
