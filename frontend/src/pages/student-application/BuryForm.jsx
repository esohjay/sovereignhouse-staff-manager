import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import logo from "../../assets/logo.png";
import Btn from "../../components/Btn";
import Input from "../../components/Input";
import RadioInput from "../../components/RadioInput";

function BuryForm() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    email: Yup.string().email().required("email is required"),
    address: Yup.string().required("address is required"),
    gender: Yup.string().required("gender is required"),
    phone: Yup.string().required("phone is required"),
  });
  const [section, setSection] = useState(1);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm(formOptions);
  const onSubmit = (data) => {
    // if (!cv) {
    //   setError("file", { type: "required" });
    //   return;
    // }
    // submitApplication({ ...data, ...cv, CampaignId: campaign });
  };
  const goBack = () => {
    reset();
    window.history.back();
  };
  const handlePrev = () => {
    setSection(section - 1);
  };
  const handleNext = () => {
    setSection(section + 1);
  };
  return (
    <section className="bg-mainColor grid place-items-center gap-y-5 py-24 min-h-screen p-3">
      <figure>
        <img src={logo} alt="logo" />
      </figure>
      <article className="w-full bg-gray rounded-lg shadow-md max-w-md lg:max-w-lg p-5">
        <h3 className="uppercase text-center font-medium mb-5">
          {/* {currentData?.position} role */}
        </h3>
        {"submissionStatus" !== "fulfilled" ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* section 1 */}
            <section className={`${section === 1 ? "block" : "hidden"}`}>
              <article className="grid md:grid-cols-2 gap-x-3">
                <Input
                  name="applicantName"
                  label="Applicant name"
                  register={register}
                  errors={errors}
                />
                <Input
                  name="email"
                  label="email"
                  description="Please add clpadmin@sovereignhousegh.education to your safe list. Check emails/spam regularly as updates are sent via email"
                  register={register}
                  errors={errors}
                />
              </article>
              <Input
                name="phone"
                label="phone"
                register={register}
                errors={errors}
              />
              <article className="mt-2">
                <RadioInput
                  name="ageGroup"
                  label="age group"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "after-school-club",
                      label: "After school club (5-6years)",
                    },
                    {
                      id: 2,
                      value: "children",
                      label: "Children (7-16years)",
                    },
                    {
                      id: 3,
                      value: "adult",
                      label: "Adult (17years above)",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="gender"
                  label="gender"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "male",
                      label: "male",
                    },
                    {
                      id: 2,
                      value: "female",
                      label: "Female",
                    },
                  ]}
                />
              </article>
              <Input
                name="class"
                label="Year/Class"
                register={register}
                errors={errors}
              />
              <Input
                name="school"
                label="current school"
                register={register}
                errors={errors}
              />
              <Input
                name="parentName"
                label="parent/Guardian's name"
                register={register}
                errors={errors}
              />
              <Input
                name="parentPostCode"
                label="parent/Guardian's postCode"
                register={register}
                errors={errors}
              />
              <Input
                name="parentAddress"
                label="parent/Guardian's Address"
                register={register}
                errors={errors}
              />
              <Input
                name="emerrgencyContact"
                label="Name of secondary emergency contact"
                register={register}
                errors={errors}
              />
              <Input
                name="emerrgencyContacPhonet"
                label="Telephone of secondary emergency contact"
                register={register}
                errors={errors}
              />
            </section>
            {/* Section 2 */}
            <section className={`${section === 2 ? "block" : "hidden"}`}>
              <h3>Medical Information of Child</h3>
              <Input
                name="gpSurgery"
                label="GP surgery"
                register={register}
                errors={errors}
              />
              <Input
                name="learningNeeds"
                label="Child’s additional learning/development needs (if any)"
                register={register}
                required={false}
                errors={errors}
              />
              <Input
                name="allergies"
                label="Allergies/Special Health Considerations (if any)"
                register={register}
                required={false}
                errors={errors}
              />
              <Input
                name="medicalSignature"
                label="Please sign/print name to agree:"
                register={register}
                description="I agree that Sovereign House GH may authorize on my behalf any basic medical treatment or First Aid my child/children may require."
                errors={errors}
              />
            </section>
            {/* Section 3 */}
            <section className={`${section === 3 ? "block" : "hidden"}`}>
              <h3>family Information</h3>
              <Input
                name="familyInfoSignature"
                label="Please sign/print name to agree:"
                register={register}
                description="I understand that Sovereign House GH will take all reasonable steps to provide a safe environment for my child/ children and that all equipment provided by them for any activity will be of standard for the purpose."
                errors={errors}
              />
            </section>
            {/* Section 4 */}
            <section className={`${section === 4 ? "block" : "hidden"}`}>
              <h3>online safety</h3>
              <p>
                The welfare of the children/young people who uses our services
                is paramount and governs our approach to the use and management
                of electronic communications technologies. Working in
                partnership with children, young people, their parents,
                volunteers, and other agencies is essential in promoting young
                people’s welfare and in helping young people to be responsible
                in their approach to e-safety.
              </p>
              <p>
                The use of information technology is an essential part of all
                our lives; it is involved in how we as a non- profit
                organisation gather and store information, as well as how we
                communicate with each other. It is also an intrinsic part of the
                experience of our children and young people and is greatly
                beneficial to all. However, it can present challenges in terms
                of how we use it responsibly and, if misused either by an adult
                or a young person, can be actually or potentially harmful to
                them.
              </p>
              <p>
                We believe in values of respecting and caring for children. We
                will inform the appropriate authorities if we find a child is
                being abused or neglected. We reserve the right for our
                volunteers and team to work in a safe and healthy environment
                and will not tolerate abuse from any child or parent. Together,
                let's work together to help the children reach their full
                potential.
              </p>
              <Input
                name="onlineSafetySignature"
                label="Please sign/print name to agree:"
                register={register}
                description="I agree with the ethos of Sovereign House GH Family sheet and Online safety values above for the Computer Learning Programme and will explain same to my child."
                errors={errors}
              />
            </section>
            {/* Section 5 */}
            <section className={`${section === 5 ? "block" : "hidden"}`}>
              <h3>consent</h3>
              <p>
                This project is highly subsidized for all children. As a charity
                aiming to empower children and enhance their digital and life
                skills, our object is to continue running this project for the
                long term to all beneficiaries. It takes money and time to
                continue offering this programme, and we rely on grants and
                donations to sustain the project. We need to show what we are
                doing to our funders and via our publications sites to continue
                applying for funds to enable us to offer the classes. We
                therefore need your consent to take aerial/activity photos or
                videos in class and during events as below:
              </p>
              <Input
                name="consentSignature"
                label="Please sign/print name to agree:"
                register={register}
                description="I give permission for my child to be included, in attending the Computer Learning Program run by Sovereign House GH."
                errors={errors}
              />
            </section>
            {/* Section 6 */}
            <section className={`${section === 6 ? "block" : "hidden"}`}>
              <h3>Child's Knowledge</h3>
              <p>
                Please rate your level of the following by ticking: 1- don’t
                know; 2-know a bit: 3-average 4- I know & understand 5.-I am
                very good* This will help us to gauge your child's level of
                learning.
              </p>
              <article className="mt-2">
                <RadioInput
                  name="programmingConstructs"
                  label="Programming constructs"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="ai"
                  label="AI and robotics"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="gameDesign"
                  label="Game design planning"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="Sequence"
                  label="Sequence"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="Selection"
                  label="Selection"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="Iteration"
                  label="Iteration"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="motions"
                  label="Motions"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="inputs-outputs"
                  label="Inputs/outputs"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="Events"
                  label="Events"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="Variables"
                  label="Variables"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="pyhton"
                  label="Text based programming – Python:"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="htmlCss"
                  label="Web development – HTML & CSS"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="E-safety"
                  label="E-safety"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
              <article className="mt-2">
                <RadioInput
                  name="hardware"
                  label="Physical Computer hardware"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "1",
                      label: "1",
                    },
                    {
                      id: 2,
                      value: "2",
                      label: "2",
                    },
                    {
                      id: 3,
                      value: "3",
                      label: "3",
                    },
                    {
                      id: 4,
                      value: "4",
                      label: "4",
                    },
                    {
                      id: 5,
                      value: "5",
                      label: "5",
                    },
                  ]}
                />
              </article>
            </section>
            <div className="py-4 flex justify-between items-center">
              <button
                onClick={handlePrev}
                className={`bg-mainColor text-white capitalize font-medium rounded-md  py-2 px-6 ${
                  section === 1 || section === 6 ? "hidden" : "inline-block"
                }`}
              >
                back
              </button>
              <button
                onClick={handleNext}
                className={`bg-mainColor text-white capitalize font-medium rounded-md  py-2 px-6 ${
                  section === 6 ? "hidden" : "inline-block"
                }`}
              >
                next
              </button>
              <button
                //   disabled={isLoading}
                className={`bg-mainColor text-white capitalize font-medium rounded-md  py-2 px-6 ${
                  section < 6 ? "hidden" : "inline-block"
                }`}
              >
                submit
              </button>
            </div>

            {/* {isError && (
              <span className="text-red-500 ">{error?.data?.message}</span>
            )} */}
          </form>
        ) : (
          <div className="grid place-items-center">
            <p className="text-mainColor">Application submitted successfully</p>
            <p className="mb-3 text-mainColor">You will hear from us shortly</p>
            <Btn text={"go back"} onClick={goBack} />
          </div>
        )}
      </article>
    </section>
  );
}

export default BuryForm;
