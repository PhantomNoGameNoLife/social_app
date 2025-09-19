import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid"

const UserInfo = ({ userAvater, userName, createdAt, flex }) => {
    return (
        <div className="flex justify-between items-center">
            <div className={`flex gap-3 ${flex ? 'items-center' : ''}`} >
                {/* avatar */}
                <div className="avatar avatar-online">
                    <div className={`rounded-full ${flex ? 'w-9' : 'w-12'}`}>
                        <img src={userAvater} />
                    </div>
                </div>
                {/* name , data */}
                <div className={`${flex ? 'flex gap-3' : ''}`}>
                    <h4 className="font-bold">{userName}</h4>
                    <p className="text-slate-50/80">{createdAt}</p>
                </div>
            </div>
            {/* icon */}
            <div className="dropdown">
                <EllipsisHorizontalIcon tabIndex={0} role="button" className="size-6 cursor-pointer text-slate-800 dark:text-slate-50" />
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><button>Item 1</button></li>
                    <li><button>Item 2</button></li>
                </ul>
            </div>
        </div >
    )
}

export default UserInfo
