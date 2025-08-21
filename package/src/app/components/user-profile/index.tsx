"use client";
import Image from "next/image"
import CardBox from "../shared/CardBox"
import Link from "next/link"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";

const UserProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<"personal" | "address" | null>(null);

    const BCrumb = [
        {
            to: "/",
            title: "Home",
        },
        {
            title: "Userprofile",
        },
    ];

    const [personal, setPersonal] = useState({
        firstName: "Mathew",
        lastName: "Anderson",
        email: "mathew.anderson@gmail.com",
        phone: "(347) 528-1947",
        position: "Team Leader",
        facebook: "https://www.facebook.com/wrappixel",
        twitter: "https://twitter.com/wrappixel",
        github: "https://github.com/wrappixel",
        dribbble: "https://dribbble.com/wrappixel"
    });

    const [address, setAddress] = useState({
        location: "United States",
        state: "San Diego, California, United States",
        pin: "92101",
        zip: "30303",
        taxNo: "GA45273910"
    });

    const [tempPersonal, setTempPersonal] = useState(personal);
    const [tempAddress, setTempAddress] = useState(address);

    useEffect(() => {
        if (openModal && modalType === "personal") {
            setTempPersonal(personal);
        }
        if (openModal && modalType === "address") {
            setTempAddress(address);
        }
    }, [openModal, modalType, personal, address]);

    const handleSave = () => {
        if (modalType === "personal") {
            setPersonal(tempPersonal);
        } else if (modalType === "address") {
            setAddress(tempAddress);
        }
        setOpenModal(false);
    };

    const socialLinks = [
        { href: "https://www.facebook.com/wrappixel", icon: "streamline-logos:facebook-logo-2-solid" },
        { href: "https://twitter.com/wrappixel", icon: "streamline-logos:x-twitter-logo-solid" },
        { href: "https://github.com/wrappixel", icon: "ion:logo-github" },
        { href: "https://dribbble.com/wrappixel", icon: "streamline-flex:dribble-logo-remix" },
    ];

    return (
        <>
            <BreadcrumbComp title="User Profile" items={BCrumb} />
            <div className="flex flex-col gap-6">
                <CardBox className="p-6 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl relative w-full break-words">
                        <div>
                            <Image src={"/images/profile/user-1.jpg"} alt="image" width={80} height={80} className="rounded-full" />
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center w-full">
                            <div className="flex flex-col sm:text-left text-center gap-1.5">
                                <h5 className="card-title">{personal.firstName} {personal.lastName}</h5>
                                <div className="flex flex-wrap items-center gap-1 md:gap-3">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{personal.position}</p>
                                    <div className="hidden h-4 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{address.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {socialLinks.map((item, index) => (
                                    <Link key={index} href={item.href} target="_blank" className="flex h-11 w-11 items-center justify-center gap-2 rounded-full shadow-md border border-defaultBorder hover:bg-gray-50 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                        <Icon icon={item.icon} width="20" height="20" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardBox>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="space-y-6 rounded-xl border border-defaultBorder  md:p-6 p-4 relative w-full break-words">
                        <h5 className="card-title">Personal Information</h5>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div><p className="text-xs text-gray-500">First Name</p><p>{personal.firstName}</p></div>
                            <div><p className="text-xs text-gray-500">Last Name</p><p>{personal.lastName}</p></div>
                            <div><p className="text-xs text-gray-500">Email</p><p>{personal.email}</p></div>
                            <div><p className="text-xs text-gray-500">Phone</p><p>{personal.phone}</p></div>
                            <div><p className="text-xs text-gray-500">Position</p><p>{personal.position}</p></div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={() => { setModalType("personal"); setOpenModal(true); }} color={"primary"} className="flex items-center gap-1.5 rounded-md">
                                <Icon icon="ic:outline-edit" width="18" height="18" /> Edit
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-6 rounded-xl border border-defaultBorder  md:p-6 p-4 relative w-full break-words">
                        <h5 className="card-title">Address Details</h5>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div><p className="text-xs text-gray-500">Location</p><p>{address.location}</p></div>
                            <div><p className="text-xs text-gray-500">Province / State</p><p>{address.state}</p></div>
                            <div><p className="text-xs text-gray-500">PIN Code</p><p>{address.pin}</p></div>
                            <div><p className="text-xs text-gray-500">ZIP</p><p>{address.zip}</p></div>
                            <div><p className="text-xs text-gray-500">Federal Tax No.</p><p>{address.taxNo}</p></div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={() => { setModalType("address"); setOpenModal(true); }} color={"primary"} className="flex items-center gap-1.5 rounded-md">
                                <Icon icon="ic:outline-edit" width="18" height="18" /> Edit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={openModal} size="lg" onClose={() => setOpenModal(false)}>
                <ModalHeader>
                    {modalType === "personal" ? "Edit Personal Information" : "Edit Address Details"}
                </ModalHeader>
                <ModalBody>
                    {modalType === "personal" ? (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="flex flex-col gap-1">
                                <Label>First Name</Label>
                                <TextInput placeholder="First Name" value={tempPersonal.firstName} onChange={(e) => setTempPersonal({ ...tempPersonal, firstName: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Last Name</Label>
                                <TextInput placeholder="Last Name" value={tempPersonal.lastName} onChange={(e) => setTempPersonal({ ...tempPersonal, lastName: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Email</Label>
                                <TextInput placeholder="Email" value={tempPersonal.email} onChange={(e) => setTempPersonal({ ...tempPersonal, email: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Phone</Label>
                                <TextInput placeholder="Phone" value={tempPersonal.phone} onChange={(e) => setTempPersonal({ ...tempPersonal, phone: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Position</Label>
                                <TextInput placeholder="Position" value={tempPersonal.position} onChange={(e) => setTempPersonal({ ...tempPersonal, position: e.target.value })} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label>Facebook URL</Label>
                                <TextInput placeholder="Facebook URL" value={tempPersonal.facebook} onChange={(e) => setTempPersonal({ ...tempPersonal, facebook: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Twitter URL</Label>
                                <TextInput placeholder="Twitter URL" value={tempPersonal.twitter} onChange={(e) => setTempPersonal({ ...tempPersonal, twitter: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>GitHub URL</Label>
                                <TextInput placeholder="GitHub URL" value={tempPersonal.github} onChange={(e) => setTempPersonal({ ...tempPersonal, github: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Dribbble URL</Label>
                                <TextInput placeholder="Dribbble URL" value={tempPersonal.dribbble} onChange={(e) => setTempPersonal({ ...tempPersonal, dribbble: e.target.value })} />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="flex flex-col gap-1">
                                <Label>Location</Label>
                                <TextInput placeholder="Location" value={tempAddress.location} onChange={(e) => setTempAddress({ ...tempAddress, location: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Province / State</Label>
                                <TextInput placeholder="Province / State" value={tempAddress.state} onChange={(e) => setTempAddress({ ...tempAddress, state: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>PIN Code</Label>
                                <TextInput placeholder="PIN Code" value={tempAddress.pin} onChange={(e) => setTempAddress({ ...tempAddress, pin: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>ZIP</Label>
                                <TextInput placeholder="ZIP" value={tempAddress.zip} onChange={(e) => setTempAddress({ ...tempAddress, zip: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Federal Tax No.</Label>
                                <TextInput placeholder="Federal Tax No." value={tempAddress.taxNo} onChange={(e) => setTempAddress({ ...tempAddress, taxNo: e.target.value })} />
                            </div>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color={"primary"} className="rounded-md" onClick={handleSave}>Save Changes</Button>
                    <Button color={"lighterror"} className="rounded-md" onClick={() => setOpenModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default UserProfile;
