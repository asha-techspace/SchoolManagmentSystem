import React, { useState } from 'react';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([
    {
      title: 'School annual sports day celebration 2023',
      date: '20 July, 2023',
      views: '20k',
      image:
        'https://media.istockphoto.com/id/1163985429/photo/group-of-schoolboys-and-schoolgirls-at-school-campus.jpg?s=612x612&w=0&k=20&c=gF0_Qpp1uZ6VAyOi90xprZISgaiLxnpssWky0zJ6gRY='
    },
    {
      title: 'Annual Function celebration 2023-24',
      date: '5 July, 2023',
      views: '15k',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS8RmZjfBChxZIvE9axOeWSKoA0UgV6I3Mipvj7_c7js4QKGlfr9aCWw8&s'
    },
    {
      title: 'Mid term examination routine published',
      date: '15 June, 2023',
      views: '22k',
      image:
        'https://media.istockphoto.com/id/1409722748/photo/students-raising-hands-while-teacher-asking-them-questions-in-classroom.jpg?s=612x612&w=0&k=20&c=NbVChOV9wIbQOhUD6BqpouZHHBbyQ2rkSjaVfIhpMv8='
    },
    {
      title: 'Inter school annual painting competition',
      date: '18 May, 2023',
      views: '18k',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS8RmZjfBChxZIvE9axOeWSKoA0UgV6I3Mipvj7_c7js4QKGlfr9aCWw8&s'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', date: '', views: '', image: '' });

  const handleAddNotice = () => {
    setNotices([...notices, newNotice]);
    setShowModal(false);
    setNewNotice({ title: '', date: '', views: '', image: '' });
  };

  const handleDeleteNotice = (index) => {
    const updatedNotices = notices.filter((_, i) => i !== index);
    setNotices(updatedNotices);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-2 lg:p-6">
      <div className="flex justify-between items-center bg-white text-black p-4 rounded-t">
        <h3 className="text-lg font-semibold">Notice Board</h3>
        <button className="text-black text-2xl" onClick={() => setShowModal(true)}>+</button>
      </div>
      <ul className="space-y-4 p-4">
        {notices.map((notice, index) => (
          <li key={index} className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src={notice.image}
                alt={notice.title}
                className="w-20 h-20 object-cover rounded sm:w-16 sm:h-16"
              />
              <div>
                <div className="text-xs  sm:text-sm">{notice.title}</div>
                <span className="text-gray-500 text-xs sm:text-xs">{notice.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-xs sm:text-xs">👁️‍🗨️ {notice.views}</span>
              <button className="text-gray-500 text-xs sm:text-base">...</button>
              <button className="text-red-500 text-xs sm:text-base" onClick={() => handleDeleteNotice(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Notice</h3>
            <input
              type="text"
              placeholder="Title"
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="text"
              placeholder="Date"
              value={newNotice.date}
              onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="text"
              placeholder="Views"
              value={newNotice.views}
              onChange={(e) => setNewNotice({ ...newNotice, views: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newNotice.image}
              onChange={(e) => setNewNotice({ ...newNotice, image: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end space-x-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddNotice}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
