import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { MdOutlineNotificationsOff, MdOutlineNotificationsNone } from "react-icons/md";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function AdminPage() {
  const [adminList, setAdminList] = useState([]);
  const [email, setEmail] = useState('');
  const [editingEmail, setEditingEmail] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  function fetchAdmins() {
    axios.get('/api/AdminHandler', {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
      }
    })
      .then(result => {
        setAdminList(result.data)
      })
      .catch(err => console.error("Error fetching admins: ", err));
  }

  function addAdmin(ev) {
    ev.preventDefault();
    axios.post('/api/AdminHandler', { email }, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
      }
    })
      .then(result => {
        setAdminList([...adminList, result.data]);
        setEmail('');
      })
      .catch(err => console.error("Error adding admin: ", err));
  }

  function startEditing(admin) {
    setEmail(admin.email);
    setEditingEmail(admin.email);
  }

  function editAdmin(ev) {
    ev.preventDefault();
    axios.put('/api/AdminHandler', { email: editingEmail, newEmail: email }, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
      }
    })
      .then(result => {
        setAdminList(adminList.map(admin => admin.email === editingEmail ? result.data : admin));
        setEmail('');
        setEditingEmail(null);
      })
      .catch(err => console.error("Error editing admin: ", err));
  }

  function deleteAdmin(email) {
    axios.delete('/api/AdminHandler', {
      data: { email }, headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
      }
    })
      .then(() => {
        setAdminList(adminList.filter(admin => admin.email !== email));
      })
      .catch(err => console.error("Error deleting admin: ", err));
  }

  async function NotificationHandler(_id, isChecked) {
    try {
      await axios.put('/api/AdminHandler', { _id, getOrderEmail: isChecked }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
        }
      }).then(() => { fetchAdmins() })
    } catch (error) {
      console.error('Error updating notification status: ', error);
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="this text-3xl font-bold mb-8">Admins Page</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <form onSubmit={editingEmail ? editAdmin : addAdmin} className="space-y-4">
            <label className="this block text-lg font-medium">
              {editingEmail ? "Edit admin" : "Add an admin"}
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="this text-lg"
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="btn-primary text-lg py-2 px-6">
                {editingEmail ? "Update" : "Save"}
              </button>
              {editingEmail && (
                <button
                  onClick={() => { setEmail(''); setEditingEmail(null); }}
                  className="edit-btn !bg-gray-200 !hover:bg-gray-300 text-lg py-2 px-6"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="basic w-full">
            <thead className="bg-gray-100">
              <tr>
                <td className="py-3 px-4 font-bold text-lg">Admins</td>
                <td className="py-3 px-4 text-center font-bold text-lg">Edit/Delete</td>
                <td className="py-3 px-4 text-center font-bold text-lg" title="Get notified when an order is received.">Notification</td>
              </tr>
            </thead>
            <tbody>
              {adminList.length > 0 && adminList.map(admin => (
                <tr key={admin.email} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">{admin.email}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center gap-2">
                      <button
                        className="delete-btn flex items-center text-white"
                        onClick={() => deleteAdmin(admin.email)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        Delete
                      </button>
                      <button
                        className="edit-btn flex items-center text-white"
                        onClick={() => startEditing(admin)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <div className="relative w-12 h-6 bg-gray-200 rounded-full shadow-inner">
                        <input
                          type="checkbox"
                          className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                          checked={admin.getOrderEmail}
                          onChange={(e) => NotificationHandler(admin._id, e.target.checked)}
                        />
                        <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${admin.getOrderEmail ? 'bg-green-500 transform translate-x-6' : 'bg-white'}`}></div>
                      </div>
                      <div className="ml-2">
                        {admin.getOrderEmail ? <MdOutlineNotificationsNone className="text-2xl text-gray-600" /> : <MdOutlineNotificationsOff className="text-2xl text-gray-400" />}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>

  );
}
