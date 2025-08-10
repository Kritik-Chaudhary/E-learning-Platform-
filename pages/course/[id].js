
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import coursesData from '../../data/courses.json'
import React from 'react'
import ProgressBar from '../../components/ProgressBar'

export default function CoursePage() {
  const router = useRouter()
  const { id } = router.query
  const course = coursesData.courses.find(c => c.id === id) || coursesData.courses[0]

  const [currentLessonId, setCurrentLessonId] = React.useState(course.lessons[0].id)
  const [completedLessons, setCompletedLessons] = React.useState([])
  const [enrolled, setEnrolled] = React.useState(false)
  const playerRef = React.useRef(null)

  React.useEffect(() => {
    if (!course) return
    const saved = JSON.parse(localStorage.getItem('progress_' + course.id) || '[]')
    setCompletedLessons(saved)
    const en = localStorage.getItem('enroll_' + course.id) === 'true'
    setEnrolled(en)
    if (course.lessons && course.lessons[0]) setCurrentLessonId(course.lessons[0].id)
  }, [id])

  const enrollToggle = () => {
    const newVal = !enrolled
    setEnrolled(newVal)
    localStorage.setItem('enroll_' + course.id, newVal ? 'true' : 'false')
  }

  // Load YouTube IFrame API
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.YT && window.YT.Player) return;
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)
    window.onYouTubeIframeAPIReady = () => createPlayer(currentLessonId)
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.YT || !window.YT.Player) return;
    createPlayer(currentLessonId)
  }, [currentLessonId])

  const createPlayer = (lessonId) => {
    const lesson = course.lessons.find(l => l.id === lessonId)
    if (!lesson) return
    const videoId = lesson.videoId
    try { if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy() } catch(e){}
    playerRef.current = new window.YT.Player('youtube-player', {
      height: '480',
      width: '100%',
      videoId,
      events: {
        onStateChange: onPlayerStateChange
      },
      playerVars: { rel: 0, modestbranding: 1 }
    })
  }

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      toggleComplete(currentLessonId, true)
    }
  }

  const toggleComplete = (lessonId, explicitSet = false) => {
    const isCompleted = completedLessons.includes(lessonId)
    let updated
    if (explicitSet) {
      if (!isCompleted) updated = [...completedLessons, lessonId]
      else updated = completedLessons
    } else {
      if (isCompleted) updated = completedLessons.filter(id => id !== lessonId)
      else updated = [...completedLessons, lessonId]
    }
    setCompletedLessons(updated)
    localStorage.setItem('progress_' + course.id, JSON.stringify(updated))
  }

  const handleSelectLesson = (lessonId) => {
    setCurrentLessonId(lessonId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const percent = Math.round((completedLessons.length / course.lessons.length) * 100)

  return (
    <Layout title={course.title}>
      <div className="space-y-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold mb-2">{course.title}</h1>
              <p className="text-sm text-gray-500 mb-4">{course.description}</p>
            </div>
            <div className="text-right">
              <div className="mb-2">{enrolled ? <span className="text-green-600">Enrolled</span> : <span className="text-gray-500">Not enrolled</span>}</div>
              <button className="px-3 py-1 border rounded text-sm" onClick={enrollToggle}>
                {enrolled ? 'Unenroll' : 'Enroll'}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <ProgressBar percent={percent} />
          </div>

          <div id="youtube-player" className="w-full aspect-video bg-black mt-4" />
          <div className="mt-4 flex gap-3 flex-wrap">
            <button className="play-btn" onClick={() => {
              const idx = course.lessons.findIndex(l => l.id === currentLessonId)
              if (idx > 0) handleSelectLesson(course.lessons[idx-1].id)
            }}>Previous</button>
            <button className="play-btn" onClick={() => {
              const idx = course.lessons.findIndex(l => l.id === currentLessonId)
              if (idx < course.lessons.length - 1) handleSelectLesson(course.lessons[idx+1].id)
            }}>Next</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={() => toggleComplete(currentLessonId)}>
              {completedLessons.includes(currentLessonId) ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="font-semibold mb-4">Curriculum</h2>
          <div className="space-y-2">
            {course.lessons.map(lesson => {
              const isCurrent = lesson.id === currentLessonId
              const isCompleted = completedLessons.includes(lesson.id)
              const thumb = `https://img.youtube.com/vi/${lesson.videoId}/hqdefault.jpg`
              return (
                <div key={lesson.id} className={`lesson-item ${isCurrent ? 'current-lesson' : ''} ${isCompleted ? 'completed-lesson' : ''}`}>
                  <div className="flex items-start gap-3">
                    <img src={thumb} alt="" className="w-24 h-14 object-cover rounded" />
                    <div>
                      <div className="">{lesson.title}</div>
                      <div className="text-xs text-gray-500">{lesson.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="play-btn" onClick={() => handleSelectLesson(lesson.id)}>Play</button>
                    <button className="text-sm px-2 py-1 border rounded" onClick={() => toggleComplete(lesson.id)}>
                      {isCompleted ? 'Undo' : 'Complete'}
                    </button>
                    {isCompleted ? <span className="inline-block px-2 py-1 rounded text-sm bg-green-100 text-green-700">✓</span> : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}
