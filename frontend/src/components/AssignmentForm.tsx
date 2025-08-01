export default function SkillTags({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {skills.map((skill, i) => (
        <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
          {skill}
        </span>
      ))}
    </div>
  );
}
