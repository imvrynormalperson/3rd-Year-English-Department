import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ArrowLeft, ExternalLink, BookOpen, GraduationCap, Users } from 'lucide-react'
import './App.css'

// Import images
import authorsPortrait from './assets/authors-portrait.jpg'
import famousWriters from './assets/famous-writers.jpg'
import libraryInterior from './assets/library-interior.jpg'
import universityLibrary from './assets/university-library.jpg'

// Course data with external resources
const coursesData = [
  {
    id: '1172',
    title: '16th & 17th Century Drama',
    marks: 100,
    credits: 4,
    description: 'Study of major dramatic works from the Renaissance period',
    readings: [
      {
        title: 'The Tragical History of Dr. Faustus',
        author: 'Christopher Marlowe',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/files/779/779-h/779-h.htm', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/doctorfaustus/', source: 'SparkNotes' },
          { text: 'Study Guide', url: 'https://www.cliffsnotes.com/literature/d/doctor-faustus/book-summary', source: 'CliffsNotes' }
        ]
      },
      {
        title: 'Macbeth',
        author: 'William Shakespeare',
        links: [
          { text: 'Full Text', url: 'https://shakespeare.mit.edu/macbeth/full.html', source: 'MIT Shakespeare' },
          { text: 'Modern Text', url: 'https://www.folger.edu/explore/shakespeares-works/macbeth/read/', source: 'Folger Library' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/shakespeare/macbeth/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'As You Like It',
        author: 'William Shakespeare',
        links: [
          { text: 'Full Text', url: 'https://shakespeare.mit.edu/asyoulikeit/full.html', source: 'MIT Shakespeare' },
          { text: 'Modern Text', url: 'https://www.folger.edu/explore/shakespeares-works/as-you-like-it/read/', source: 'Folger Library' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/shakespeare/asyoulikeit/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Volpone',
        author: 'Ben Jonson',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/files/4039/4039-h/4039-h.htm', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/volpone/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'The Duchess of Malfi',
        author: 'John Webster',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/2232', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/duchessmalfi/', source: 'SparkNotes' }
        ]
      }
    ]
  },
  {
    id: '1173',
    title: '16th & 17th Century Poetry',
    marks: 100,
    credits: 4,
    description: 'Exploration of Renaissance and Metaphysical poetry',
    readings: [
      {
        title: 'The Faerie Queene Book 1 Canto 1',
        author: 'Edmund Spenser',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/15', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/spenser/section1/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Selected Poems',
        author: 'John Donne',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/23045', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/donne/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Selected Poems',
        author: 'Andrew Marvell',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/27821', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/marvell/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Selected Poems',
        author: 'George Herbert',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/16025', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/herbert/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Paradise Lost Book 1',
        author: 'John Milton',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/20', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/paradiselost/', source: 'SparkNotes' }
        ]
      }
    ]
  },
  {
    id: '1174',
    title: '17th and 18th Century Non-Fictional Prose',
    marks: 100,
    credits: 4,
    description: 'Study of essays, speeches, and critical works',
    readings: [
      {
        title: 'Essays',
        author: 'Francis Bacon',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/575', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/philosophy/bacon/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Areopagitica',
        author: 'John Milton',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/files/608/608-h/608-h.htm', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/areopagitica/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'The Spectator (Selections)',
        author: 'Addison & Steele',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/12030', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/spectator/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Life of Cowley',
        author: 'Samuel Johnson',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/2678', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/johnson/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Speech on East India Bill',
        author: 'Edmund Burke',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/15043', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/philosophy/burke/', source: 'SparkNotes' }
        ]
      }
    ]
  },
  {
    id: '1175',
    title: 'Restoration and Eighteenth Century Fiction',
    marks: 100,
    credits: 4,
    description: 'Early novels and fictional narratives',
    readings: [
      {
        title: 'Oroonoko',
        author: 'Aphra Behn',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/688', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/oroonoko/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Robinson Crusoe',
        author: 'Daniel Defoe',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/521', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/crusoe/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Joseph Andrews',
        author: 'Henry Fielding',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/6408', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/josephandrews/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Gulliver\'s Travels',
        author: 'Jonathan Swift',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/829', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/gulliver/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Rasselas',
        author: 'Samuel Johnson',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/652', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/rasselas/', source: 'SparkNotes' }
        ]
      }
    ]
  },
  {
    id: '1176',
    title: 'Restoration and Eighteenth Century Poetry and Drama',
    marks: 100,
    credits: 4,
    description: 'Neoclassical poetry and Restoration comedy',
    readings: [
      {
        title: 'Mac Flecknoe',
        author: 'John Dryden',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/16698', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/dryden/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'The Way of the World',
        author: 'William Congreve',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/1292', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/wayofworld/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'The Rape of the Lock',
        author: 'Alexander Pope',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/9800', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/pope/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Selected Poems',
        author: 'Thomas Gray',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/43', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/gray/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'She Stoops to Conquer',
        author: 'Oliver Goldsmith',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/1240', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/lit/shestoops/', source: 'SparkNotes' }
        ]
      }
    ]
  },
  {
    id: '1177',
    title: 'Victorian Poetry',
    marks: 100,
    credits: 4,
    description: 'Major Victorian poets and their works',
    readings: [
      {
        title: 'Selected Works',
        author: 'Alfred Tennyson',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/8601', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/tennyson/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Selected Works',
        author: 'Robert Browning',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/1304', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/browning/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Selected Works',
        author: 'Matthew Arnold',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/4999', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/arnold/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Selected Works',
        author: 'Christina Rossetti',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/12847', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/rossetti/', source: 'SparkNotes' }
        ]
      },
      {
        title: 'Selected Works',
        author: 'Gerard Manley Hopkins',
        links: [
          { text: 'Full Text', url: 'https://www.gutenberg.org/ebooks/22', source: 'Project Gutenberg' },
          { text: 'Analysis', url: 'https://www.sparknotes.com/poetry/hopkins/', source: 'SparkNotes' }
        ]
      }
    ]
  },
  {
    id: '1178',
    title: 'Introduction to Linguistics',
    marks: 100,
    credits: 4,
    description: 'Fundamental concepts in language study',
    topics: [
      'Characteristics of language',
      'Basic concepts (Langue and Parole)',
      'Phonetics',
      'Morphology',
      'Syntax',
      'Psycholinguistics',
      'Sociolinguistics'
    ],
    resources: [
      { text: 'MIT OpenCourseWare - Linguistics', url: 'https://ocw.mit.edu/courses/linguistics-and-philosophy/', source: 'MIT' },
      { text: 'Stanford Encyclopedia - Philosophy of Language', url: 'https://plato.stanford.edu/entries/philosophy-language/', source: 'Stanford' },
      { text: 'Linguistic Society of America', url: 'https://www.linguisticsociety.org/resource/what-linguistics', source: 'LSA' },
      { text: 'Open Access Linguistics Journals', url: 'https://doaj.org/search?source=%7B%22query%22%3A%7B%22filtered%22%3A%7B%22filter%22%3A%7B%22bool%22%3A%7B%22must%22%3A%5B%7B%22terms%22%3A%7B%22index.classification.exact%22%3A%5B%22Linguistics%22%5D%7D%7D%5D%7D%7D%2C%22query%22%3A%7B%22match_all%22%3A%7B%7D%7D%7D%7D%7D', source: 'DOAJ' }
    ]
  },
  {
    id: '1179',
    title: 'Professional English',
    marks: 100,
    credits: 4,
    description: 'Business and professional communication skills',
    topics: [
      'Business letters',
      'Official notices',
      'Memos',
      'Press releases',
      'Professional communication strategies'
    ],
    resources: [
      { text: 'Purdue OWL - Professional Writing', url: 'https://owl.purdue.edu/owl/subject_specific_writing/professional_technical_writing/', source: 'Purdue' },
      { text: 'Business Writing Guide', url: 'https://www.plainlanguage.gov/guidelines/', source: 'Plain Language' },
      { text: 'MIT Communication for Managers', url: 'https://ocw.mit.edu/courses/sloan-school-of-management/15-279-communication-for-managers-fall-2012/', source: 'MIT' },
      { text: 'Writing Commons - Professional Writing', url: 'https://writingcommons.org/chapters/professional-writing', source: 'Writing Commons' }
    ]
  }
]

function HomePage() {
  const totalMarks = coursesData.reduce((sum, course) => sum + course.marks, 0)
  const totalCredits = coursesData.reduce((sum, course) => sum + course.credits, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="hero-gradient text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
              Hon's 3rd Year English Department
            </h1>
            <p className="font-inter text-xl md:text-2xl mb-6 opacity-90 animate-fadeInUp animate-delay-100">
              National University, Bangladesh
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg animate-fadeInUp animate-delay-200">
              <div className="flex items-center gap-2">
                <BookOpen size={24} />
                <span>Total Marks: {totalMarks}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={24} />
                <span>Total Credits: {totalCredits}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={24} />
                <span>{coursesData.length} Courses</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img src={authorsPortrait} alt="Classic Authors" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <p className="text-white p-4 font-inter font-medium">Classic Authors</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img src={famousWriters} alt="Famous Writers" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <p className="text-white p-4 font-inter font-medium">Literary Masters</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img src={libraryInterior} alt="Library Interior" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <p className="text-white p-4 font-inter font-medium">Study Environment</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img src={universityLibrary} alt="University Library" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <p className="text-white p-4 font-inter font-medium">Academic Resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            Course Catalog
          </h2>
          <div className="course-grid grid gap-6">
            {coursesData.map((course, index) => (
              <Card key={course.id} className={`course-card animate-fadeInUp animate-delay-${(index % 3) * 100}`}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="font-mono text-sm">
                      {course.id}
                    </Badge>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{course.marks} marks</div>
                      <div>{course.credits} credits</div>
                    </div>
                  </div>
                  <CardTitle className="font-playfair text-xl mb-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="font-inter">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/course/${course.id}`}>
                    <Button className="w-full font-inter font-medium">
                      View Course Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-playfair text-2xl font-bold mb-4">
            National University, Bangladesh
          </h3>
          <p className="font-inter mb-4">
            English Department - Third Year Honours Program
          </p>
          <p className="font-inter text-sm opacity-80">
            All external resources are freely accessible and provided for educational purposes.
          </p>
        </div>
      </footer>
    </div>
  )
}

function CoursePage() {
  const { courseId } = useParams()
  const course = coursesData.find(c => c.id === courseId)

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-4xl font-bold mb-4">Course Not Found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-primary-foreground hover:opacity-80 mb-4">
            <ArrowLeft className="mr-2" size={20} />
            Back to Course Catalog
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <Badge variant="secondary" className="font-mono mb-2">
                Course {course.id}
              </Badge>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
                {course.title}
              </h1>
              <p className="font-inter text-lg opacity-90">
                {course.description}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-2xl font-bold">{course.marks}</div>
              <div className="text-sm opacity-80">marks</div>
              <div className="text-2xl font-bold">{course.credits}</div>
              <div className="text-sm opacity-80">credits</div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          {course.readings && (
            <section className="mb-12">
              <h2 className="font-playfair text-2xl font-bold mb-6">Required Readings</h2>
              <div className="space-y-6">
                {course.readings.map((reading, index) => (
                  <Card key={index} className="animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                    <CardHeader>
                      <CardTitle className="font-playfair text-xl">
                        {reading.title}
                      </CardTitle>
                      <CardDescription className="font-inter text-lg">
                        by {reading.author}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {reading.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="external-link font-inter"
                          >
                            <ExternalLink size={16} />
                            {link.text} ({link.source})
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {course.topics && (
            <section className="mb-12">
              <h2 className="font-playfair text-2xl font-bold mb-6">Course Topics</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {course.topics.map((topic, index) => (
                      <li key={index} className="font-inter flex items-center">
                        <BookOpen className="mr-3 text-primary" size={16} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )}

          {course.resources && (
            <section>
              <h2 className="font-playfair text-2xl font-bold mb-6">Additional Resources</h2>
              <div className="grid gap-4">
                {course.resources.map((resource, index) => (
                  <Card key={index} className="animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                    <CardContent className="pt-6">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link font-inter text-lg"
                      >
                        <ExternalLink size={18} />
                        {resource.text} ({resource.source})
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
      </Routes>
    </Router>
  )
}

export default App

