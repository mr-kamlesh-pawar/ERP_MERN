import React from 'react';

const StudentDashboard = () => {
  const cards = [
    { icon: 'https://res.cloudinary.com/dftldrxjh/image/upload/v1739281918/Images/ijek8iohuthqwjx1gfjo.png', title: 'Account', link: 'account' },
    { icon: 'https://res.cloudinary.com/dftldrxjh/image/upload/v1739281919/Images/rbmzkvrscdwvih5rrady.png', title: 'Attendance', link: 'attendance' },
    { icon: 'https://res.cloudinary.com/dftldrxjh/image/upload/v1739281919/Images/wmonr8lnbnncle2rnuer.png', title: 'Assignment' },
    { icon: 'https://res.cloudinary.com/dftldrxjh/image/upload/v1739281920/Images/kxypri3joxsvcy0946lc.png', title: 'Timetable', link:'timetable'},
    { icon: 'https://res.cloudinary.com/dftldrxjh/image/upload/v1739281920/Images/tocnfhkmlepd8analtat.png', title: 'Results', link:'test-result' },
    { icon: 'https://res.cloudinary.com/dftldrxjh/image/upload/v1739281919/Images/ngfkgriyzygohbrqrfgp.png', title: 'Academic Calendar', link:'academic' },
    { icon: 'https://res.cloudinary.com/dftldrxjh/image/upload/v1739281919/Images/n3xpda3v9aejsdvurxnj.png', title: 'Fees', link:'fees' },
    { icon: 'https://res.cloudinary.com/dftldrxjh/image/upload/v1739281920/Images/uf3y3vb7bpssgyi0vlzd.png', title: 'Notification', link:'notices' },
    { icon: 'http://res.cloudinary.com/dftldrxjh/image/upload/v1739281919/Images/cobmzeablwihe5xbql9r.png', title: 'Upcoming Event', link:'events' },
    { icon: 'http://res.cloudinary.com/dftldrxjh/image/upload/v1739281919/Images/wd4ozsnkgxqbhi6dru9r.png', title: 'College Policy', link:'policy' },
    { icon: 'https://cdn3d.iconscout.com/3d/premium/thumb/job-offer-3d-icon-download-in-png-blend-fbx-gltf-file-formats--letter-opportunity-employment-availability-pack-business-icons-10842857.png?f=webp', title: 'College Placements', link:'placements' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/4664/4664514.png', title: 'Department Faculties', link:'faculties' },
  ];

  return (
    <div
      className="bg-cover bg-center min-h-screen relative -m-[25px]"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dftldrxjh/image/upload/v1739281924/Images/iqzbzresd8zrw6f1dftn.jpg')",
      }}
    >
      {/* Background blur overlay */}
      <div
        className="absolute inset-0 backdrop-blur"
        style={{
          backdropFilter: "blur(5px)",
        }}
      ></div>

      {/* Cards container */}
      <div className="relative z-10 container mx-auto p-4 sm:p-6 lg:p-8 flex justify-center mt-14 ">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 w-[90%]">
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.link || '#'}
              className="no-underline transform transition-transform duration-300 hover:scale-105 focus:scale-105"
            >
              <div className="card p-4 sm:p-6 bg-white bg-opacity-90 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center justify-center">
                <img
                  src={card.icon}
                  alt={`${card.title} Icon`}
                  className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 object-contain"
                />
                <h3 className="text-center text-lg sm:text-xl font-semibold text-gray-800">{card.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;