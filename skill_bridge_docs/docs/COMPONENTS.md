# SkillBridge Component Library

---

## Navbar

- **Props:** `user`, `onLogout`
- **Usage:** `<Navbar user={user} onLogout={logoutFn} />`
- **Description:** Top navigation bar with logo, links, user menu

## Sidebar

- **Props:** `activePage`, `onNavigate`
- **Usage:** `<Sidebar activePage="dashboard" onNavigate={fn} />`
- **Description:** Fixed left nav, icons, active state, responsive

## StatCard

- **Props:** `title`, `value`, `icon`, `trend`
- **Usage:** `<StatCard title="Readiness" value="72%" icon="bolt" trend="+5%" />`
- **Description:** Dashboard stat summary

## SkillRadarChart

- **Props:** `data`, `labels`
- **Usage:** `<SkillRadarChart data={data} labels={labels} />`
- **Description:** Radar/spider chart for skill comparison

## CircularScoreMeter

- **Props:** `score`, `max`, `label`
- **Usage:** `<CircularScoreMeter score={72} max={100} label="Job Ready" />`
- **Description:** Circular SVG/Canvas score visualization

## SkillProgressRow

- **Props:** `skill`, `current`, `required`, `status`
- **Usage:** `<SkillProgressRow skill="Python" current={75} required={90} status="In Progress" />`
- **Description:** Row in skill gap table

## ModuleCard

- **Props:** `title`, `status`, `progress`, `tags`
- **Usage:** `<ModuleCard title="SQL Basics" status="Completed" progress={100} tags={["SQL", "Beginner"]} />`
- **Description:** Learning path module card

## LearningPathTimeline

- **Props:** `milestones`, `current`
- **Usage:** `<LearningPathTimeline milestones={arr} current={2} />`
- **Description:** Horizontal timeline of learning milestones

## SkillGapTable

- **Props:** `skills`, `onSelect`
- **Usage:** `<SkillGapTable skills={arr} onSelect={fn} />`
- **Description:** Table of skills, gaps, and status

## JobMatchCard

- **Props:** `job`, `onApply`, `onSave`
- **Usage:** `<JobMatchCard job={jobObj} onApply={fn} onSave={fn} />`
- **Description:** Card for matched job/internship

## StepProgressBar

- **Props:** `steps`, `currentStep`
- **Usage:** `<StepProgressBar steps={arr} currentStep={1} />`
- **Description:** Onboarding step indicator

## ResumeUploader

- **Props:** `onUpload`, `progress`, `error`
- **Usage:** `<ResumeUploader onUpload={fn} progress={50} error={null} />`
- **Description:** Drag-and-drop or click-to-upload resume

## OnboardingCard

- **Props:** `title`, `description`, `icon`, `selected`, `onClick`
- **Usage:** `<OnboardingCard title="Data Analyst" selected onClick={fn} />`
- **Description:** Card for onboarding options

## FeatureCard

- **Props:** `title`, `icon`, `description`
- **Usage:** `<FeatureCard title="AI Skill Analysis" icon="psychology" description="..." />`
- **Description:** Landing page feature highlight

## TestimonialCard

- **Props:** `name`, `role`, `text`, `avatar`
- **Usage:** `<TestimonialCard name="Sarah" role="Data Scientist" text="..." avatar={url} />`
- **Description:** User testimonial

## CTABanner

- **Props:** `title`, `subtitle`, `ctaText`, `onClick`
- **Usage:** `<CTABanner title="Ready to Bridge Your Gap?" ctaText="Start My Free Analysis" onClick={fn} />`
- **Description:** Call-to-action banner
