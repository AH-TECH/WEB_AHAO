import React from 'react'

const Drawer = () => {
  return (
    <div class="drawer lg:drawer-open ">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    
    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu  min-h-full w-80 p-4 bg-[#1D232A] text-white">
     
      <li className='hover:bg-gray-50 hover:text-[#1D232A]   rounded-lg'><a>Sidebar Item 1</a></li>
      <li className='hover:bg-gray-50 hover:text-[#1D232A]   rounded-lg'><a>Sidebar Item 1</a></li>
      <li className='hover:bg-gray-50 hover:text-[#1D232A]   rounded-lg'><a>Sidebar Item 1</a></li>
      <li className='hover:bg-gray-50 hover:text-[#1D232A]   rounded-lg'><a>Sidebar Item 1</a></li>
    </ul>
  </div>
</div>
  )
}

export default Drawer