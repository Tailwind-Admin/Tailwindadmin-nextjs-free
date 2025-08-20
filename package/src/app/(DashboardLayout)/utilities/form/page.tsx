"use client";
import { Button, Checkbox, Datepicker, FileInput, Label, Radio, Select, Textarea, TextInput, ToggleSwitch } from "flowbite-react";
import React, { useState } from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import { Icon } from "@iconify/react/dist/iconify.js";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Forms",
  },
];

const page = () => {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);
  const [website, setWebsite] = useState("www.tailwind-admin.com");
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(website);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <>
      <BreadcrumbComp title="From Elements" items={BCrumb} />
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border dark:border-darkborder  md:p-6 p-0 relative w-full break-words">
            <h5 className="card-title">Default Inputs</h5>
            <div className="mt-6">
              <div className="flex flex-col gap-6">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name">Input</Label>
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    required
                    className="form-control form-rounded-xl"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name">Input with Placeholder</Label>
                  </div>
                  <TextInput
                    id="firstname"
                    type="text"
                    placeholder="Firstname"
                    required
                    className="form-control form-rounded-xl"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="countries">Select Input</Label>
                  </div>
                  <Select id="countries" required className="">
                    <option>Select an option</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>France</option>
                    <option>Germany</option>
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password">Password Input</Label>
                  </div>
                  <TextInput
                    placeholder="Enter your Password"
                    id="password"
                    type="password"
                    required
                    className="form-control form-rounded-xl"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="datepicker">Date Picker Input</Label>
                  </div>
                  <Datepicker id="datepicker"/>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="time">Time Picker Input</Label>
                  </div>
                  <TextInput
                    type="time"
                    id="time"
                    className="form-control form-rounded-xl w-full"
                    min="09:00"
                    max="18:00"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="card"/>
                  </div>
                  <TextInput
                    type="text"
                    id="card"
                    icon={() => <Icon icon="uim:master-card" width="20" height="20" />}
                    placeholder="Card number"
                    className="form-control form-rounded-xl"
                  />
                </div>

              </div>
            </div>
          </div>
          <div className="h-fit rounded-xl border border-border dark:border-darkborder  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">Select Inputs</h5>
            <div className="flex flex-col gap-6 mt-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="countries">Select Input</Label>
                </div>
                <Select id="countries" required className="">
                  <option>Select an option</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Germany</option>
                </Select>
              </div>
            </div>
          </div>
          <div className="h-fit rounded-xl border border-border dark:border-darkborder  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">Textarea input field</h5>
            <div className="flex flex-col gap-6 mt-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description">Description</Label>
                </div>
                <Textarea
                  id="comment"
                  placeholder="Leave a comment..."
                  required
                  rows={4}
                  className="form-control-textarea"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description">Description</Label>
                </div>
                <Textarea
                  disabled
                  id="comment"
                  placeholder="Leave a comment..."
                  required
                  rows={4}
                  className="form-control-textarea"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" color="failure" >Description</Label>
                </div>
                <Textarea
                  id="input-failure"
                  placeholder="Leave a comment..."
                  required
                  rows={4}
                  color="failure"
                  className="form-control-textarea"
                />
              </div>
            </div>
          </div>
          <div className="h-fit rounded-xl border border-border dark:border-darkborder  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">Input Element Colors</h5>
            <div className="flex flex-col gap-6 mt-6">
              <div className="md:col-span-6 col-span-12">
                <div className="mb-2 block">
                  <Label htmlFor="input-warning" color="warning">Warning</Label>
                </div>
                <TextInput
                  id="input-warning"
                  placeholder="Input Warning"
                  required
                  color="warning"
                  className="outline-none! focus:ring-warning! focus:border-warning!"
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <div className="mb-2 block">
                  <Label htmlFor="input-info" color="info">Info</Label>
                </div>
                <TextInput
                  id="input-info"
                  placeholder="Input Info"
                  required
                  color="info"
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <div className="mb-2 block">
                  <Label htmlFor="input-success" color="success">Success</Label>
                </div>
                <TextInput
                  id="input-success"
                  placeholder="Input Success"
                  required
                  color="success"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="h-fit rounded-xl border border-border dark:border-darkborder  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">Input Group</h5>
            <div className="flex flex-col gap-6 mt-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email"/>
                </div>
                <TextInput id="email4" type="email" icon={() => <Icon icon="si:mail-line" width="20" height="20" className="text-gray-400" />} placeholder="name@flowbite.com" required className="form-control form-rounded-xl" />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phone" />
                </div>
                <TextInput
                  type="phone"
                  id="phone"
                  icon={() => <Icon icon="solar:phone-rounded-linear" width="22" height="22" className="text-gray-400" />}
                  placeholder="+1"
                  className="form-control form-rounded-xl"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="website" />
                </div>
                <TextInput
                  type="text"
                  id="website"
                  icon={() => <Icon icon="streamline-plump:web" width="20" height="20" className="text-gray-400" />}
                  placeholder="www.example.com"
                  className="form-control form-rounded-xl"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="url"/>
                </div>
                <TextInput
                  type="text"
                  id="url"
                  icon={() => <Icon icon="arcticons:urlsanitizer" width="22" height="22" className="text-gray-600" />}
                  placeholder="www.tailwind-admin.com"
                  className="form-control form-rounded-xl"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="website" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Website
                </label>

                <div className="flex items-center gap-2 rounded-lg overflow-hidden">
                  <TextInput
                    type="text"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="form-control form-rounded-xl w-full"
                  />

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:text-blue-200 border border-gray-300 dark:border-gray-600 rounded-md mr-2"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div className="h-fit rounded-xl border border-border dark:border-darkborder  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">File Input</h5>
            <div className="flex flex-col gap-6 mt-6">
              <div id="fileUpload">
                <div className="block">
                  <Label htmlFor="file" />
                </div>
                <FileInput id="file" />
              </div>
            </div>
          </div>

          <div className="h-fit rounded-xl border border-border dark:border-darkborder  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">Checkbox</h5>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Checkbox id="promotion" />
                <Label htmlFor="promotion">
                  Default
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked id="promotion" />
                <Label htmlFor="promotion">
                  Checked
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox disabled id="promotion" />
                <Label htmlFor="promotion">
                  Disabled
                </Label>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-xl border border-border dark:border-darkborder  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">Radio Buttons</h5>
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 cursor-pointer">
                <Radio id="default" name="radioGroup" value="default" defaultChecked />
                <Label htmlFor="default" >
                  Default
                </Label>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Radio id="selected" name="radioGroup" value="selected" />
                <Label htmlFor="selected" >
                  Selected
                </Label>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Radio id="disabled" name="radioGroup" value="disabled" disabled />
                <Label htmlFor="disabled" >
                  Disabled
                </Label>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-xl border border-border dark:border-darkborder  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">Toggle Switch</h5>
            <div className="flex flex-wrap gap-6 mt-6">
              <ToggleSwitch
                checked={switch1}
                label="Toggle me"
                onChange={setSwitch1}
              />
              <ToggleSwitch
                checked={switch2}
                label="Toggle me (checked)"
                onChange={setSwitch2}
              />
              <ToggleSwitch
                checked={false}
                disabled
                label="Toggle me (disabled)"
                onChange={() => undefined}
              />
              <ToggleSwitch
                checked={true}
                disabled
                label="Toggle me (disabled)"
                onChange={() => undefined}
              />
              <ToggleSwitch checked={switch3} onChange={setSwitch3} />
            </div>
          </div>

          <div className="h-fit rounded-xl border border-border dark:border-darkborder  md:p-6 p-4 relative w-full break-words">
            <h5 className="card-title">Dropzone</h5>
            <div className="flex w-full items-center justify-center py-2 mt-6">
              <Label
                htmlFor="dropzone-file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <FileInput id="dropzone-file" className="hidden" />
              </Label>
            </div>
          </div>


        </div>
      </div >
    </>
  );
};

export default page;