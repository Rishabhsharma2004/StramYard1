import React, { useState, useEffect } from 'react';
import { Button, Spinner, Card, Modal, TextInput, Select } from 'flowbite-react';
import { HiOutlineFilter } from 'react-icons/hi';
import { Link, useLocation , useNavigate} from 'react-router-dom';


export default function Search() {
    const [query, setQuery] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [sidebarData, setSidebardata] = useState({
        searchTerm :'',
        sort:'desc',
        category:'uncategorized',
    })
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
   useEffect(()=>{
       const urlParams = new URLSearchParams(location.search);
       const searchTermFromUrl = urlParams.get('searchTerm');
       const sortFromUrl = urlParams.get('sort');
       const categoryFromUrl = urlParams.get('category');
       if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
        setSidebardata({
            ...sidebarData,
            searchTerm:searchTermFromUrl,
            sort:sortFromUrl,
            category: categoryFromUrl,
        });
       }

       const fetchPosts = async () =>{
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if(!res.ok){
            setLoading(false);
            return;
        }
        if(res.ok){
            const data = await res.json();
            setPosts(data.posts);
            setLoading(false);
            if(data.posts.length === 9){
               setShowMore(true);
            }else{
                setShowMore(false);
            }
        }
        
       }
       fetchPosts();
   },[location.search]);
    const handleSearch = (e) =>{
        if(e.target.id === 'searchTerm'){
            setSidebardata({...sidebarData, searchTerm:e.target.value});
        }
        if(e.target.id == 'sort'){
            const order = e.target.value || 'desc';
            setSidebardata({...sidebarData, sort:order})
        }
        if(e.target.id == 'category'){
            const category = e.target.value || 'uncategorized';
            setSidebardata({...sidebarData, category: category});
        }
       
    }
    const handlefilter = (e) =>{
        e.preventDefault();
        setModalOpen(false);
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    const handleShoeMore = async()=>{
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`)
        if(!res.ok){
            return ;
        }
        if(res.ok){
            const data = await res.json();
            setPosts([...posts,...data.posts]);
            if(data.posts === 9){
                setShowMore(true);
            }else{
                setShowMore(false);
            }
        }
    }
    return (
        <div className="p-4">
            {loading && <Spinner aria-label="Loading" className="w-full flex items-center justify-center mb-4" />}
            
            <div className="flex flex-col md:flex-row">
                {/* Filter Icon for Mobile */}
                <div className="md:hidden mb-4 flex justify-end">
                    <Button
                        onClick={() => setModalOpen(true)}
                        className="bg-gray-100 text-gray-700 p-0 rounded-full shadow-md"
                    >
                        <HiOutlineFilter className="w-4 h-4" />
                    </Button>
                </div>

                {/* Filter Section */}
                <div className="hidden h-screen md:block w-1/4 bg-gray-100 dark:bg-transparent mr-5 p-4 rounded-lg shadow-md dark:border dark:border-gray-600">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    {/* Add filter options here */}
                    <form onSubmit={handlefilter} className='flex flex-col gap-8'>
                        <div className=' flex items-center gap-2 whitespace-normal font-semibold'>
                            <label>Search Term:</label>
                            <TextInput placeholder='Search...' id='searchTerm' type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleSearch}
                            />
                        </div>
                        <div className=' flex items-center gap-2'>
                            <label>Sort:</label>
                            <Select onChange={handleSearch} 
                            value={sidebarData.sort} id='sort'>
                                <option value= 'desc'>Latest</option>
                                <option value= 'asc'>Oldest</option>
                            </Select>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <label>Category:</label>
                            <Select onChange={handleSearch} 
                            value={sidebarData.category} id='category'>
                                <option value= 'uncategorized'>Uncategorized</option>
                                <option value= 'reactjs'>React.js</option>
                                <option value= 'nextjs'>Next.js</option>
                                <option value= 'javascript'>JavaScript</option>
                            </Select>
                        </div>
                        <Button type='submit'>
                             Apply Filters
                        </Button>
                    </form>
                </div>

                {/* Search Results Section */}
                <div className="w-full md:w-3/4">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {posts.length ? (
                            posts.map((article) => (
                                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{article.title.length > 40 ? article.title.substring(0,40):article.title}</h3>
                                        <Link to={`/post/${article.slug}`}>
                                        <Button color="blue" className="w-full mt-2">Read More</Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p>No results found</p>
                        )}
                        {
                            showMore && (
                                <button className=' text-teal-500 text-lg p-7 w-full hover:underline flex min-w-full items-center justify-center' onClick={handleShoeMore}>Show more</button>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* Modal for Filters */}
            <Modal className=' dark:bg-slate-800 dark:text-white' show={modalOpen} onClose={() => setModalOpen(false)}>
                <Modal.Header>Filters</Modal.Header>
                <Modal.Body>
                    <div className="p-4">
                        {/* Add filter options here */}
                        <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
                        <form onSubmit={handlefilter} className='flex flex-col gap-8'>
                        <div className=' flex items-center gap-2 whitespace-normal font-semibold'>
                            <label>Search Term:</label>
                            <TextInput placeholder='Search...' id='searchTerm' type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleSearch}
                            />
                        </div>
                        <div className=' flex items-center gap-2'>
                            <label>Sort:</label>
                            <Select onChange={handleSearch} 
                            value={sidebarData.sort} id='sort'>
                                <option value= 'desc'>Latest</option>
                                <option value= 'asc'>Oldest</option>
                            </Select>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <label>Category:</label>
                            <Select onChange={handleSearch} 
                            value={sidebarData.category} id='category'>
                                <option value= 'uncategorized'>Uncategorized</option>
                                <option value= 'reactjs'>React.js</option>
                                <option value= 'nextjs'>Next.js</option>
                                <option value= 'javascript'>JavaScript</option>
                            </Select>
                        </div>
                        <Button type='submit'>
                             Apply Filters
                        </Button>
                    </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalOpen(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
