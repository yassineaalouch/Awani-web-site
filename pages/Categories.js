import DeletePopup from "@/components/DeletePopup";
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

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

export default function CategoriesPage() {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [editedCategory, setEditCategory] = useState(null);
    const [_id, setId] = useState('');
    const [cancelCode, setCancelCode] = useState(true);
    const [error, setError] = useState(false);
    // const [properties, setProperties] = useState([]);
    const [isEditing,setIsEditing] = useState(false);
    const [loopError,setLoopError] = useState(false)
    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }

    async function saveCategory(ev) {
        ev.preventDefault();
        const data = {
            name,
            parentCategory,
        };
        const namesList = categories.map(ele => (ele.name));
        if ((name.trim() !== ""&& isEditing && parentCategory !== name)||(!isEditing && name.trim() !=="" && !namesList.includes(name) && parentCategory !== name)) {
            if (editedCategory) {
                await axios.put('/api/categories', { ...data, _id: editedCategory._id });
                setEditCategory(null);
            } else {
                await axios.post('/api/categories', data);
            }
            setName('');
            setParentCategory('');
            fetchCategories();
            setError(false);
        } else {
            setError(true);
        }
        setIsEditing(false)
    }

    function editCategory(category) {
        setIsEditing(true)
        setEditCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
    };

    function deleteCategory(category) {
        setId(category._id);
        setCancelCode(false);
    }



    function HandlCancel() {
        setCancelCode(true);
    };

    function ParentsCategoryName(category) {
        const parentNames = [];
        let currentCategory = category;
        let list =[]
        while (currentCategory?.parent) {

            list = categories.filter(cat=>{if(cat.name===currentCategory.parent.name){return true}else{return false}})
            parentNames.push(currentCategory.parent.name);
            currentCategory = list[0];

        }
        return parentNames.join(' > ');
    }


    // function ParentsCategory(category){
    //     let list =[category]
    //     let listNames = ParentsCategoryName(category).split(' > ');
    //     for(let i = 0; i < listNames.length; i++){
    //         const filteredCategories = categories.filter(cat =>{if(cat.name === listNames[i]){return true}else{return false}});
    //         list = list.concat(filteredCategories);
    //     }
    //     return list;
    // }



    return (
        <Layout>
            <h1 className="this">Categories</h1>
            <label className="this">{editedCategory ? (<>Edit category <b>&quot;{editedCategory.name}&quot;</b></>) : "Add new category name"}</label>
            <form onSubmit={saveCategory} >
                <div className="flex gap-1 mb-2">
                    <input
                        type="text"
                        className="this !mb-0 "
                        placeholder={"Category name"}
                        onChange={ev => setName(ev.target.value)}
                        value={name}
                    />

                    <select
                        className="this !mb-0"
                        value={parentCategory}
                        onChange={ev => setParentCategory(ev.target.value)}>
                        <option value="">No parent category</option>
                        {categories.length > 0 && categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                {error && <p className="text-red-600 text-xs pl-1 pb-1">The name is either void or already exists.</p>}
                {loopError && <p className="text-red-600 text-xs pl-1 pb-1">You will run into an infinite loop error</p>}

                <div className=" mb-2">

                </div>

                <button type="submit" className="btn btn-primary py-1">Save</button>
                {editedCategory && <button type="button" onClick={() => { setEditCategory(''); setName(''); setParentCategory(''); {/*setProperties([])*/} }} className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-lg ml-3">Cancel</button>}
            </form>

            {!editedCategory && (
                <table className="basic">
                    <thead>
                        <tr>
                            <td><b>Category name</b></td>
                            <td><b>Parent category</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 && categories.map(category => (
                            <tr key={category.name}>
                                <td>{category.name}</td>
                                <td>{ParentsCategoryName(category)}</td>


                                <td className="flex gap-2">
                                    <button className="edit-btn" onClick={() => editCategory(category)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </button>

                                    <button className="delete-btn" onClick={() => deleteCategory(category)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!cancelCode && <DeletePopup link="/api/categories" _id={_id} cancelCode={HandlCancel} fetchCategories={fetchCategories} />}
        </Layout>
    )
}
