import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { FaEnvelope, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import ImageFallback from "./components/ImageFallback";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, form_action, phone, mail, location } = frontmatter;
  const [userSubject, setUserSubject] = useState("");

  return (
    <section className="section mt-8 sm:mt-12 lg:mt-16">
      <div className="container">
        <div className="row relative pb-8 sm:pb-12 md:pb-16">
          <ImageFallback
            className="-z-[1] object-cover object-top"
            src={"/images/map.svg"}
            fill="true"
            alt="map bg"
            priority={true}
          />
          <div className="lg:col-6">
            {markdownify(
              title,
              "h1",
              "h1 my-6 sm:my-8 lg:my-11 lg:pt-11 text-center lg:text-left text-[32px] sm:text-[42px] md:text-[55px] lg:text-[64px]"
            )}
          </div>
          <div className="contact-form-wrapper rounded border border-border p-4 sm:p-6 dark:border-darkmode-border lg:col-6">
            <h2>
              Send Us A
              <span className="ml-1.5 inline-flex items-center text-primary">
                Message
                <BsArrowRightShort />
              </span>
            </h2>
            <form
              className="contact-form mt-12"
              method="POST"
              action={form_action}
            >
              {/* Formsubmit hidden field for subject line formatting */}
              <input
                type="hidden"
                name="_subject"
                value={`Message from Umair Siddiqui Website - ${userSubject}`}
              />
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="name">
                  Full name
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  type="text"
                  placeholder="Thomas Milano"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="email">
                  Email Address
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="subject">
                  Subject
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="user_subject"
                  type="text"
                  placeholder="Blog advertisement"
                  value={userSubject}
                  onChange={(e) => setUserSubject(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="message">
                  Your Message Here
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <textarea
                  className="form-textarea w-full"
                  name="message"
                  placeholder="Hello I’m Mr ‘x’ from………….."
                  rows="7"
                  required
                />
              </div>
              <input
                className="btn btn-primary"
                type="submit"
                value="Send Now"
              />
            </form>
          </div>
        </div>
        <div className="row">
          {phone && (
            <div className="md:col-6 lg:col-4">
              <Link
                href={`tel:${phone}`}
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaUserAlt />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {phone}
                </p>
              </Link>
            </div>
          )}
          {mail && (
            <div className="md:col-6 lg:col-4">
              <Link
                href={`mailto:${mail}`}
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaEnvelope />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {mail}
                </p>
              </Link>
            </div>
          )}
          {location && (
            <div className="md:col-6 lg:col-4">
              <span
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaMapMarkerAlt />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {location}
                </p>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
