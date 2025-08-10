
export default function CourseCard({ course, enrolled }) {
  const vid = course.lessons && course.lessons[0] && course.lessons[0].videoId
  const thumb = vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : course.banner
  return (
    <a href={`/course/${course.id}`} className="block border rounded-md overflow-hidden hover:shadow-lg transition">
      <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
        <img src={thumb} alt={course.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-500">{course.description}</p>
        <div className="mt-2 text-sm">{enrolled ? <span className="text-green-600">Enrolled</span> : <span className="text-gray-500">Not enrolled</span>}</div>
      </div>
    </a>
  );
}
