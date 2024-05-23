import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('searchTerm') || '';
    const type = urlParams.get('type') || 'all';
    const parking = urlParams.get('parking') === 'true';
    const furnished = urlParams.get('furnished') === 'true';
    const offer = urlParams.get('offer') === 'true';
    const sort = urlParams.get('sort') || 'created_at';
    const order = urlParams.get('order') || 'desc';

    setSidebarData({ searchTerm, type, parking, furnished, offer, sort, order });

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) setShowMore(true);
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setSidebarData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(sidebarData);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) setShowMore(false);
    setListings((prevListings) => [...prevListings, ...data]);
  };

  return (
    <div className='min-h-screen bg-gray-800 text-white'>
      <div className='p-6 max-w-4xl mx-auto bg-gray-900 bg-opacity-90 rounded-lg shadow-lg'>
        <h1 className='text-3xl text-center font-semibold mb-7'>Listing Search</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <label htmlFor='searchTerm' className='font-semibold text-orange-500'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border p-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-500'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold text-orange-500'>Type:</label>
            {['all', 'rent', 'sale'].map((type) => (
              <div key={type} className='flex gap-2'>
                <input
                  type='checkbox'
                  id='type'
                  className='w-5'
                  checked={sidebarData.type === type}
                  onChange={() => setSidebarData({ ...sidebarData, type })}
                />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </div>
            ))}
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold text-orange-500'>Amenities:</label>
            {['parking', 'furnished'].map((amenity) => (
              <div key={amenity} className='flex gap-2'>
                <input
                  type='checkbox'
                  id={amenity}
                  className='w-5'
                  checked={sidebarData[amenity]}
                  onChange={handleChange}
                />
                <span>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</span>
              </div>
            ))}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                checked={sidebarData.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor='sort_order' className='font-semibold text-orange-500'>
              Sort:
            </label>
            <select
              id='sort_order'
              className='border p-3 rounded-lg bg-gray-700 text-white'
              value={`${sidebarData.sort}_${sidebarData.order}`}
              onChange={handleChange}
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='created_at_desc'>Latest</option>
              <option value='created_at_asc'>Oldest</option>
            </select>
          </div>
          <button type='submit' className='bg-orange-500 text-white p-3 rounded-lg uppercase hover:bg-orange-600'>
            Search
          </button>
        </form>
      </div>
      <div className='p-7'>
        <h1 className='text-3xl text-center font-semibold mt-5 text-orange-500'>Listing Results</h1>
        <div className='flex flex-wrap gap-4'>
          {loading && <p className='text-xl text-orange-500 text-center w-full'>Loading...</p>}
          {!loading && listings.length === 0 && <p className='text-xl text-orange-500'>No listings found!</p>}
          {!loading &&
            listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-orange-500 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
