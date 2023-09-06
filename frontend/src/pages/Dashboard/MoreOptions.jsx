import React from "react"
import { useNavigate } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";
import { AiFillEye } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { GrRevert } from "react-icons/gr";
import axios from "axios";
axios.defaults.withCredentials = true;


function MoreOptions({ published, postId }) {
    const navigate = useNavigate();
    async function viewHandler(text) {
        if (text === "Edit") {
            navigate("/dashboard/edit-post/" + postId);
        }
        if (text === "Delete") {
            const sendRequestToDelete = async () => {
                await axios
                    .delete("http://localhost:3001/post/deletepost/" + postId, { withCredentials: true })
                    .catch((err) => console.log(err));
            };

            sendRequestToDelete().then(() => {
                alert("Sucessfully, Deleted..")
                window.location.reload();
            });
        }
        if (text === "Revert to Draft" || text === "Publish") {
            await axios
                .put(`http://localhost:3001/post/updatepost/${postId}/isDraft`, {
                    withCredentials: true,
                })
                .then(() => {
                    alert("Sucessfully, Changed..")
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        }

    }


    const options = [
        {
            icon: published ? <GrRevert className="text-2x" /> : <IoMdSend />,
            text: published ? "Revert to Draft" : "Publish",
        },
        {
            icon: <AiFillEye />,
            text: "Edit",
        },

        {
            icon: <IoMdTrash />,
            text: "Delete",
        },


    ]
    return (
        <div
            className="absolute  bg-white border rounded shadow"
            onClick={e => e.stopPropagation()}
        >
            {options.map((val) => (
                <span className="text-txtLight flex w-full px-4 items-center border-b-[1px] border-gray-300 hover:bg-gray-200 gap-1 hover:text-dark cursor-pointer" onClick={() => viewHandler(val.text)}>{val.icon} {val.text}</span>
            ))}
        </div>
    )
}

export default MoreOptions;