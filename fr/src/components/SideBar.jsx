// Search Box component
const SearchBox = ({ ...props }) => (
  <div className="relative w-full bg-white rounded-lg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5 text-gray-400 absolute left-3 inset-y-0 my-auto"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd"
      />
    </svg>

    <input
      {...props}
      type="email"
      className="w-full pl-12 pr-3 py-2  text-sm text-gray-500 bg-transparent outline-none border ring-blue-600 focus:ring-2 shadow-sm rounded-lg duration-200"
    />
  </div>
);

const categoryInputFilter = [
  "Auto & Rad",
  "Möbel",
  "Elektornik",
  "Haustiere",
  "Mode",
  "Haus & Garten",
];

// PostZip Box component
const PostZip = ({ ...props }) => (
  <div className="relative w-full bg-white rounded-lg">
    <input
      {...props}
      type="postzip"
      className="w-full pl-5 pr-3 py-2  text-sm text-gray-500 bg-transparent outline-none border ring-blue-600 focus:ring-2 shadow-sm rounded-lg duration-200"
    />
  </div>
);

// PreisFiltern Box component
const PreisFiltern = ({ ...props }) => (
  <div className="relative w-full bg-white rounded-lg">
    <input
      {...props}
      type="email"
      className="w-full pl-3 pr-3 py-2  text-sm text-gray-500 bg-transparent outline-none border ring-blue-600 focus:ring-2 shadow-sm rounded-lg duration-200"
    />
  </div>
);

const favCategory = ["Laptop", "Kamera", "Fernsehen", "Rad", "Auto", "Wohnung"];

const SideBar = () => {
  return (
    <>
      <nav className="bg-background-filter-light-blue space-y-3 sm:w-80 ps-6 py-5 ms-3 my-3 me-2 rounded-lg">
        <div className=" space-y-5 w-4/5 bg-background-filter-light-blue">
          <div className="h-14 bg-background-filter-light-blue text-white flex items-center border-b ">
            <p>Filtern</p>
          </div>
          <div className=" ">
            <SearchBox placeholder="Suchen..." />
          </div>
        </div>

        <>
          <div className=" ">
            <fieldset>
              {categoryInputFilter.map((category, index) => (
                <div className="mt-2 space-y-6 " key={index}>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6 text-white">
                      <label key={index} htmlFor={category}>
                        {category}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </fieldset>
          </div>
        </>

        <>
          <div>
            <div className="w-4/5 bg-background-filter-light-blue">
              <div className=" mt-5">
                <PostZip placeholder="Postleitzahl" />
              </div>
              <div className="relative mt-3">
                <select
                  className="w-full pl-5 pr-3 py-2 text-sm bg-white text-button-blue shadow-sm rounded-lg duration-200"
                  id="grid-state"
                >
                  <option>+10 Km</option>
                  <option>+20 Km</option>
                  <option>+30 Km</option>
                  <option>+40 Km</option>
                  <option>50+ Km</option>
                </select>
              </div>
            </div>
          </div>
        </>

        <>
          <div className="  w-4/5 bg-background-filter-light-blue">
            <div className="h-14 mt-5 bg-background-filter-light-blue text-white flex items-center ">
              <p>Nach Preis filtern</p>
            </div>
            <div className="flex w-6/7">
              <div className="mr-5 ">
                <PreisFiltern placeholder="Von" />
              </div>
              <div className=" ">
                <PreisFiltern placeholder="Bis" />
              </div>
            </div>
          </div>
        </>

        <>
          <div className=" w-4/5 bg-background-filter-light-blue">
            <div className="h-14 mt-5 bg-background-filter-light-blue text-white flex items-center ">
              <p>Nach Beliebtheit filtern</p>
            </div>
            <fieldset>
              {favCategory.map((category, index) => (
                <div className="mt-2 space-y-6 " key={index}>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6 text-white">
                      <label key={index} htmlFor={category}>
                        {category}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </fieldset>
          </div>
        </>
        <div>
          <button className="btn mt-5  w-4/5 bg-button-orange border border-0.5 border-button-orange hover:border-button-blue">
            Suchen
          </button>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
