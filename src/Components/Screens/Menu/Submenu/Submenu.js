import './Submenu.css'
import SubmenuSwip from './SubmenuSwip/SubmenuSwip';
// import left from '../../../../Components/Assets/icons/chevron_left.svg'
// import right from '../../../../Components/Assets/icons/chevron_right.svg'


function Submenu({ categories, allCategories, activeMenu, setActiveMenu }) {



    return (
        <>
            <div className="menu-title-wrapper">
                <div className="container">
                    <h1 className="menuTitle">Our Menu</h1>
                    
                </div>
            </div>
            <div className="nav_wrapper">
                <div className="container">
                    <div className="submenu">
                        {/* <button className="prev" id="prevBtn"><img src={right} alt="" /></button> */}
                        <ul className="sideCategories">
                            <SubmenuSwip categories={categories} activeMenu={activeMenu} setActiveMenu={setActiveMenu} allCategories={allCategories}/>
                            {/* {
                                categories?.map((cat, index) => (
                                    <li className={`nav-item ${index === activeMenu && 'active'}`} key={cat._id}  onClick={() => setActiveMenu(index)}>
                                        <a 
                                        href={`#${index}`} 
                                        className={`nav-link `}
                                        >
                                            {allCategories?.find(c => c._id === cat._id)?.name}
                                        </a>
                                       
                                    </li>
                                ))
                            } */}

                        </ul>
                        {/* <button className="next" id="nextBtn"><img src={left} alt="" /></button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Submenu;