import React from "react";

const CollegePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* College Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Shri Jain Vidya Prasark Mandal’s
          </h1>
          <h2 className="text-3xl font-semibold text-gray-700 mt-2">
            Rasiklal M. Dhariwal Institute of Technology, Chinchwad
          </h2>
          <p className="text-gray-600 mt-2">
            (Approved by AICTE New Delhi, Govt. Of Maharashtra & Affiliated to MSBTE Mumbai)
          </p>
          <p className="text-gray-600">
            MSBTE CODE - 0363, DTE CODE - 6423
          </p>
        </div>

        {/* College Policy Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">College Policy</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              The college is committed to providing a safe, inclusive, and conducive environment for
              learning and personal growth. All students, faculty, and staff are expected to adhere to
              the following policies:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Academic Integrity:</strong> Students must maintain honesty and integrity in
                all academic work. Plagiarism, cheating, or any form of academic dishonesty will not
                be tolerated.
              </li>
              <li>
                <strong>Code of Conduct:</strong> Students are expected to behave respectfully
                towards peers, faculty, and staff. Any form of harassment or discrimination is
                strictly prohibited.
              </li>
              <li>
                <strong>Attendance:</strong> Regular attendance is mandatory for all lectures,
                practicals, and other academic activities.
              </li>
              <li>
                <strong>Dress Code:</strong> Students must adhere to the prescribed dress code during
                college hours and official events.
              </li>
              <li>
                <strong>Use of Facilities:</strong> College facilities, including labs, libraries,
                and sports equipment, must be used responsibly and with care.
              </li>
            </ul>
          </div>
        </section>

        {/* Terms and Conditions Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              By enrolling in this institution, students agree to abide by the following terms and
              conditions:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Admission:</strong> Admission is granted based on merit and eligibility
                criteria. The college reserves the right to cancel admission if any discrepancy is
                found.
              </li>
              <li>
                <strong>Fees:</strong> All fees must be paid within the stipulated time. Failure to
                do so may result in penalties or cancellation of admission.
              </li>
              <li>
                <strong>Examinations:</strong> Students must follow the examination rules and
                regulations set by the college and the affiliated university.
              </li>
              <li>
                <strong>Disciplinary Action:</strong> Violation of college policies may result in
                disciplinary action, including suspension or expulsion.
              </li>
              <li>
                <strong>Privacy Policy:</strong> The college respects the privacy of its students and
                staff. Personal information will not be shared with third parties without consent.
              </li>
              <li>
                <strong>Amendments:</strong> The college reserves the right to amend policies, terms,
                and conditions as deemed necessary. Students will be notified of any changes.
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        {/* <div className="mt-8 text-center text-gray-600">
          <p>
            For any queries, please contact the administration office at{" "}
            <a href="mailto:admin@rmdit.ac.in" className="text-blue-600 hover:underline">
              admin@rmdit.ac.in
            </a>
            .
          </p>
          <p className="mt-2">© 2023 Rasiklal M. Dhariwal Institute of Technology. All rights reserved.</p>
        </div> */}
      </div>
    </div>
  );
};

export default CollegePolicyPage;