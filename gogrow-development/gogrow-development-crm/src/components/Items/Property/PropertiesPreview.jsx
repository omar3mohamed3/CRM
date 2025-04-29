import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import { IoClose } from "react-icons/io5";
import imagelo from "/Logo.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../../../Store/productsSlice/productsSlice";
import { fetchProperty } from "../../../Store/propertyiesSlice/propertyiesSlice";
import Loader from "../../Layout/Loader";
import CardLayout from "../../CardLayout";

const PropertiesPreview = () => {
  const { id: propertyId } = useParams();
  const dispatch = useDispatch();
  const { property: propertDeatial, loading } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    dispatch(fetchProperty({ propertyId }));
  }, [dispatch, propertyId]);

  const property = {
    id: propertDeatial?.id,
    title: propertDeatial?.title,
    propertyID: propertDeatial?.id,
    description: propertDeatial?.description,
    assigned: propertDeatial?.teams?.[0]?.team_name,
    type: propertDeatial?.type,
    rentType: propertDeatial?.rental_type?.name,
    price: propertDeatial?.price,
    lastAction: propertDeatial?.updated_at,
    created: propertDeatial?.created_at,
    address: propertDeatial?.address,
    location: propertDeatial?.location,
    city: propertDeatial?.propertiescity?.name,
    country: propertDeatial?.propertiescountry?.name,
    district: propertDeatial?.district,
    objective: propertDeatial?.objective,
    date: propertDeatial?.available_date,
    unitType: propertDeatial?.unit_type?.name,
    features: propertDeatial?.features,
    // ["Balcony", "Garage", "Swimming Pool"],
    // details: ["3 Bedrooms", "2 Bathrooms", "150 sqm"],
    direction: propertDeatial?.direction_of_property,
    photo: propertDeatial?.photos,
    // [(imagelo, imagelo, imagelo)], // Replace with real images
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null); // Reference for the modal content

  const images = property?.photo;

  // Handle closing the modal when clicking outside
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  if (loading) return <Loader />;

  if (!property) return <CardLayout>property data not available</CardLayout>;

  return (
    <div className="py-1 h-full">
      <div className="w-full rounded-card shadow-card h-full overflow-y-auto bg-white mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{property.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="property-swiper">
              {images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full max-h-[300px] rounded-card cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="  grid grid-cols-2 gap-1">
            <p>
              <span className="font-semibold">Property ID:</span>{" "}
              {property.propertyID}
            </p>
            <p>
              <span className="font-semibold">Price:</span> {property.price}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {property.type}
            </p>
            {property.rentType && (
              <p>
                <span className="font-semibold">Rent Type:</span>{" "}
                {property.rentType}
              </p>
            )}
            <p>
              <span className="font-semibold">City:</span> {property.city}
            </p>
            <p>
              <span className="font-semibold">Country:</span> {property.country}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {property.address}
            </p>
            <p>
              <span className="font-semibold">District:</span>{" "}
              {property.district}
            </p>
            <p>
              <span className="font-semibold">Objective:</span>{" "}
              {property.objective}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              <Link
                to={property.location}
                target="_blank"
                className="  text-blue-400 hover:text-blue-500">
                Link
              </Link>
            </p>
            <p>
              <span className="font-semibold">Assigned to:</span>{" "}
              {property.assigned}
            </p>
            <p>
              <span className="font-semibold">Last Action:</span>{" "}
              {property.lastAction}
            </p>
            <p>
              <span className="font-semibold">Created:</span> {property.created}
            </p>

            <p>
              <span className="font-semibold">Features:</span>{" "}
              {property?.features?.join(", ")}
            </p>
            {/* <p>
              <span className="font-semibold">Details:</span>{" "}
              {property.details.join(", ")}
            </p> */}
            <p>
              <span className="font-semibold">Direction:</span>{" "}
              {property.direction}
            </p>
            <p>
              <span className="font-semibold">Unit Type:</span>{" "}
              {property.unitType}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(property.date).toLocaleString()}
            </p>
          </div>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {property.description}
          </p>
        </div>

        {isModalOpen && (
          <div
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div
              ref={modalRef}
              className="max-w-3xl w-full relative">
              <Swiper
                modules={[Navigation, Pagination, Zoom]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                zoom={{ maxRatio: 3 }}
                className="modal-swiper">
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container">
                      <img
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full rounded-card h-auto py-2"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 hover:bg-slate-200 bg-white rounded-card p-2 text-black">
                <IoClose />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPreview;
