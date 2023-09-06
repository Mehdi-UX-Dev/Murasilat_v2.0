
import Image from "next/image";
import photo from "../../../../../public/images/photo.jpg";

// !there is a problem in between the flex and grid of this PAGE at the div 2 and 3rd
//? may be due to the small size of the page i will make it a module which could be shown on instant on list page
function UserProfile({ params: { id } }: { params: { id: number } }) {
  return (
    <div className=" grid grid-cols-3 mt-28 drop-shadow-lg bg-white max-w-5xl p-5 mx-auto">
      <div className="p-4  space-y-4 border-r border-black">
        <div className="space-y-1 text-right">
          {" "}
          {/* //* The degree is also of a predefined option  */}
          <label className="text-primary-500 " htmlFor="">
          درجه تحصیل
          </label>
          <input
            type="text"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
          />
        </div>
        <div className="space-y-1 text-right">
          {" "}
          {/* //* The degree is also of a predefined option  */}
          <label className="text-primary-500 block" htmlFor="">
            دیپارتمنت
          </label>
          <input
            type="text"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
          />
        </div>
        <div className="space-y-1 text-right">
          {" "}
          {/* //* The degree is also of a predefined option  */}
          <label className="text-primary-500 block" htmlFor="">
            سن
          </label>
          <input
            type="text"
            value={""}
            className="adminPageInputStyle "
            readOnly
            dir="rtl"
            
          />
        </div>
      </div>

      <div className="border-r border-black p-4 space-y-2 grid col-span-1">
        <>
          {" "}
          <label htmlFor="" className="text-primary-500 text-right">
            ایمیل
          </label>
          <input
            type="email"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
          />
        </>
        <>
          {" "}
          <label className="text-primary-500 text-right " htmlFor="">
            نام پدر
          </label>
          <input
            type="text"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
          />
        </>
        <>
          {" "}
          <label className="text-primary-500 text-right" htmlFor="">
            شماره تماس
          </label>
          <input
            type="text"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
          />
        </>
        <>
          {" "}
          <label className="text-primary-500 text-right" htmlFor="">
            تذكره
          </label>
          <input
            type="text"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
          />
        </>
      </div>

      <div className=" py-2 col-span-1 space-y-2  ">
        <Image
          src={photo}
          alt="person photo"
          className="w-40 h-40 rounded-full object-cover mx-auto"
        />
        <div className="text-center space-y-1">
          <input
            className="font-bold font-IranSans text-2xl text-center "
            value={"باهر حکیمی"}
            type="text"
            readOnly
          />
          {/* //* the faculty and roles are all predefined so the input will be of a select type   */}
          <input
            type="text"
            className=" text-center"
            value={"کمپیوټر ساینس پوهنځی"}
          />
          <input
            type="text"
            className=" text-center"
            value={"امریت دیپارتمنت"}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
