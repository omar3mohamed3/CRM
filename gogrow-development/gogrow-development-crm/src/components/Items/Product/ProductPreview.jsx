import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import productPhoto from "/Logo.png";
import Loader from "../../Layout/Loader";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { IoClose } from "react-icons/io5";
import CardLayout from "../../CardLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../Store/productsSlice/productsSlice";
import { useParams } from "react-router-dom";
import { formatNumber } from "../../../Url/url";

const ProductPreview = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct({ productId }));
  }, [dispatch, productId]);

  const productDetails = {
    id: product.id,
    photo: product?.images?.map((image) => image.image_path), //Change with api
    name: product?.name,
    category: product?.category?.name,
    price: product?.selling_price,
    tax: product?.tax,
    discount: product?.discount,
    total: product?.total,
    code: product?.code,
    worldCode: product?.world_code,
    assigned: product?.assigned_to,
    description: product?.description,
    LastAction: product?.updated_at,
    Created: product?.created_at,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null); // Reference for the modal content

  if (loading) return <Loader />;

  if (!productDetails)
    return <CardLayout>No product data available</CardLayout>;

  const images = productDetails.photo;

  // Function to handle closing the modal when clicking outside
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className=" py-1 h-full">
      <div className=" w-full rounded-card shadow-card  h-full bg-white mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{productDetails.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" h-full">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="product-swiper">
              {images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${productDetails.name} - Image ${index + 1}`}
                    className="w-full h-full max-h-[450px]  rounded-card cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="space-y-4">
            <p>
              <span className="font-semibold">Price:</span>{" "}
              {formatNumber(productDetails.price)}
            </p>
            <p>
              <span className="font-semibold">Discount:</span>
              {formatNumber(productDetails.discount)}
            </p>
            <p>
              <span className="font-semibold">Tax:</span>{" "}
              {formatNumber(productDetails.tax)}
            </p>
            <p>
              <span className="font-semibold">Total:</span>{" "}
              {formatNumber(productDetails.total)}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {productDetails.category}
            </p>
            <p>
              <span className="font-semibold">Code:</span> {productDetails.code}
            </p>
            <p>
              <span className="font-semibold">World Code:</span>{" "}
              {productDetails.worldCode}
            </p>
            {/* <p>
              <span className="font-semibold">Assigned to:</span>{" "}
              {productDetails.assigned || "No Team Assigned to this product"}
            </p> */}
            <p>
              <span className="font-semibold">Last Action:</span>{" "}
              {productDetails.LastAction || "No Team Assigned to this product"}
            </p>
            <p>
              <span className="font-semibold">Created at:</span>{" "}
              {productDetails.Created || "No Team Assigned to this product"}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {productDetails.description}
            </p>
          </div>
        </div>

        {isModalOpen && (
          <div
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div
              ref={modalRef}
              className="max-w-3xl w-full">
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
                    <div className="swiper-zoom-container  ">
                      <img
                        src={image}
                        alt={`${productDetails.name} - Image ${index + 1}`}
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

export default ProductPreview;
