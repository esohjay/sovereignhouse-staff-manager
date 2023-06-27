import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useCreateApplicationMutation } from "../../api/student-application";
import { useForm } from "react-hook-form";

import logo from "../../assets/logo.png";
import Btn from "../../components/Btn";
import Input from "../../components/Input";
import RadioInput from "../../components/RadioInput";

function BuryForm() {
  // const validationSchema = Yup.object().shape({
  //   first_name: Yup.string().required("first name is required"),
  //   last_name: Yup.string().required("last name is required"),
  //   address: Yup.string().required("address is required"),
  //   email: Yup.string().required("email is required"),

  //   gender: Yup.string().required("gender is required"),
  //   age_group: Yup.string().required("age is required"),
  //   phone: Yup.string().required("phone is required"),
  //   emergency_contact_phone: Yup.string().required(
  //     "emergency contact is required"
  //   ),
  //   emergency_contact_name: Yup.string().required(
  //     "emergency contact is required"
  //   ),
  //   class: Yup.string().required("class is required"),
  //   gp_surgery: Yup.string().required("gp surgery is required"),
  //   learning_needs: Yup.string(),
  //   allergies: Yup.string(),
  //   medical_signature: Yup.string(),
  //   family_info_signature: Yup.string().required("input your full name"),
  //   school: Yup.string().required("school is required"),
  //   ai: Yup.string().required("field is required"),
  //   sequence: Yup.string().required("field is required"),
  //   selection: Yup.string().required("field is required"),
  //   iteration: Yup.string().required("field is required"),
  //   motions: Yup.string().required("field is required"),
  //   events: Yup.string().required("field is required"),
  //   variables: Yup.string().required("field is required"),
  //   pyhton: Yup.string().required("field is required"),
  //   hardware: Yup.string().required("field is required"),
  //   e_safety: Yup.string().required("field is required"),
  //   html_css: Yup.string().required("field is required"),
  //   inputs_outputs: Yup.string().required("field is required"),
  //   game_design: Yup.string().required("field is required"),
  //   programming_constructs: Yup.string().required("field is required"),
  //   consent_signature: Yup.string().required("input your full name"),
  //   online_safety_signature: Yup.string().required("input your full name"),
  //   parent_post_code: Yup.string().required("post code is required"),
  //   parent_name: Yup.string().required("parent name is required"),
  //   parent_address: Yup.string().required("parent address is required"),
  // });
  const [section, setSection] = useState(1);
  const [age, setAge] = useState("adult");
  const [submitApplication, { error, isLoading, isSuccess, isError }] =
    useCreateApplicationMutation();
  // const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // if (!cv) {
    //   setError("file", { type: "required" });
    //   return;
    // }
    submitApplication(data);
    console.log(data);
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
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "age_group") {
        setAge(value.age_group);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, age]);

  return (
    <section className="bg-mainColor grid place-items-center gap-y-5 py-24 min-h-screen p-3">
      <figure>
        <img src={logo} alt="logo" />
      </figure>
      <article className="w-full bg-gray rounded-lg shadow-md  lg:max-w-lg p-5">
        <h3 className="uppercase text-center font-medium mb-5">
          CLP Bury Application Form
        </h3>
        {!isSuccess ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* section 1 */}
            <section className={`${section === 1 ? "block" : "hidden"}`}>
              <article className="grid md:grid-cols-2 md:place-items-center gap-x-3">
                <Input
                  name="first_name"
                  label="First name"
                  register={register}
                  errors={errors}
                />
                <Input
                  name="last_name"
                  label="Last name"
                  register={register}
                  errors={errors}
                />
              </article>
              <Input
                name="email"
                label="email"
                description="Please add clpadmin@sovereignhousegh.education to your safe list. Check emails/spam regularly as updates are sent via email"
                register={register}
                errors={errors}
              />
              <Input
                name="phone"
                label="phone"
                register={register}
                errors={errors}
              />
              <article className="mt-2">
                <RadioInput
                  name="age_group"
                  label="age group"
                  register={register}
                  errors={errors}
                  optionValues={[
                    {
                      id: 1,
                      value: "after_school_club",
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
            </section>
            {age !== "adult" && (
              <section>
                {/* section 2 */}
                <section
                  className={`${
                    section === 2 && age !== "adult" ? "block" : "hidden"
                  }`}
                >
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
                    name="parent_name"
                    label="parent/Guardian's name"
                    register={register}
                    errors={errors}
                  />
                  <Input
                    name="parent_post_code"
                    label="parent/Guardian's postCode"
                    register={register}
                    errors={errors}
                  />
                  <Input
                    name="parent_address"
                    label="parent/Guardian's Address"
                    register={register}
                    errors={errors}
                  />
                  <Input
                    name="emergency_contact_name"
                    label="Name of secondary emergency contact"
                    register={register}
                    errors={errors}
                  />
                  <Input
                    name="emergency_contact_phone"
                    label="Telephone of secondary emergency contact"
                    register={register}
                    errors={errors}
                  />
                </section>
                {/* Section 3 */}
                <section
                  className={`${
                    section === 3 && age !== "adult" ? "block" : "hidden"
                  }`}
                >
                  <h3 className="font-semibold capitalize mb-2">
                    Medical Information of Child
                  </h3>
                  <Input
                    name="gp_surgery"
                    label="GP surgery"
                    register={register}
                    errors={errors}
                  />
                  <Input
                    name="learning_needs"
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
                    name="medical_signature"
                    label="Please sign/print name to agree:"
                    register={register}
                    description="I agree that Sovereign House GH may authorize on my behalf any basic medical treatment or First Aid my child/children may require."
                    errors={errors}
                  />
                </section>
                {/* Section 4 */}
                <section
                  className={`${
                    section === 4 && age !== "adult" ? "block" : "hidden"
                  }`}
                >
                  <h3 className="font-semibold capitalize mb-2">
                    family Information
                  </h3>
                  <Input
                    name="family_info_signature"
                    label="Please sign/print name to agree:"
                    register={register}
                    description="I understand that Sovereign House GH will take all reasonable steps to provide a safe environment for my child/ children and that all equipment provided by them for any activity will be of standard for the purpose."
                    errors={errors}
                  />
                </section>
                {/* Section 5 */}
                <section
                  className={`${
                    section === 5 && age !== "adult" ? "block" : "hidden"
                  }`}
                >
                  <h3 className="font-semibold capitalize mb-2">
                    online safety
                  </h3>
                  <p className="mb-5">
                    The welfare of the children/young people who uses our
                    services is paramount and governs our approach to the use
                    and management of electronic communications technologies.
                    Working in partnership with children, young people, their
                    parents, volunteers, and other agencies is essential in
                    promoting young people’s welfare and in helping young people
                    to be responsible in their approach to e-safety.
                  </p>
                  <p className="mb-5">
                    The use of information technology is an essential part of
                    all our lives; it is involved in how we as a non- profit
                    organisation gather and store information, as well as how we
                    communicate with each other. It is also an intrinsic part of
                    the experience of our children and young people and is
                    greatly beneficial to all. However, it can present
                    challenges in terms of how we use it responsibly and, if
                    misused either by an adult or a young person, can be
                    actually or potentially harmful to them.
                  </p>
                  <p className="mb-5">
                    We believe in values of respecting and caring for children.
                    We will inform the appropriate authorities if we find a
                    child is being abused or neglected. We reserve the right for
                    our volunteers and team to work in a safe and healthy
                    environment and will not tolerate abuse from any child or
                    parent. Together, let's work together to help the children
                    reach their full potential.
                  </p>
                  <Input
                    name="online_safety_signature"
                    label="Please sign/print name to agree:"
                    register={register}
                    description="I agree with the ethos of Sovereign House GH Family sheet and Online safety values above for the Computer Learning Programme and will explain same to my child."
                    errors={errors}
                  />
                </section>
                {/* Section 6 */}
                <section
                  className={`${
                    section === 6 && age !== "adult" ? "block" : "hidden"
                  }`}
                >
                  <h3 className="font-semibold capitalize mb-2">consent</h3>
                  <p className="mb-5">
                    This project is highly subsidized for all children. As a
                    charity aiming to empower children and enhance their digital
                    and life skills, our object is to continue running this
                    project for the long term to all beneficiaries. It takes
                    money and time to continue offering this programme, and we
                    rely on grants and donations to sustain the project. We need
                    to show what we are doing to our funders and via our
                    publications sites to continue applying for funds to enable
                    us to offer the classes. We therefore need your consent to
                    take aerial/activity photos or videos in class and during
                    events as below:
                  </p>
                  <Input
                    name="consent_signature"
                    label="Please sign/print name to agree:"
                    register={register}
                    description="I give permission for my child to be included, in attending the Computer Learning Program run by Sovereign House GH."
                    errors={errors}
                  />
                </section>
                {/* Section 7 */}
                <section
                  className={`${
                    section === 7 && age !== "adult" ? "block" : "hidden"
                  }`}
                >
                  <h3 className="font-semibold capitalize mb-2">
                    Child's Knowledge
                  </h3>
                  <p className="mb-2">
                    Please rate your level of the following by ticking: 1- don’t
                    know; 2-know a bit: 3-average 4- I know & understand 5.-I am
                    very good* This will help us to gauge your child's level of
                    learning.
                  </p>
                  <article className="mt-2">
                    <RadioInput
                      name="programming_constructs"
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
                      name="game_design"
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
                      name="sequence"
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
                      name="selection"
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
                      name="iteration"
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
                      name="inputs_outputs"
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
                      name="events"
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
                      name="variables"
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
                      name="html_css"
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
                      name="e_safety"
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
              </section>
            )}
            {age !== "adult" ? (
              <div className="py-4 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  type="button"
                  className={`bg-mainColor text-white capitalize font-medium rounded-md  py-2 px-6 ${
                    section === 1 ? "hidden" : "inline-block"
                  }`}
                >
                  back
                </button>
                <button
                  onClick={handleNext}
                  type="button"
                  className={`bg-mainColor text-white capitalize font-medium rounded-md  py-2 px-6 ${
                    section === 7 ? "hidden" : "inline-block"
                  }`}
                >
                  next
                </button>
                <button
                  //   disabled={isLoading}
                  className={`bg-mainColor text-white capitalize font-medium rounded-md  py-2 px-6 ${
                    section < 7 ? "hidden" : "inline-block"
                  }`}
                >
                  submit
                </button>
              </div>
            ) : (
              <button
                //   disabled={isLoading}
                className={`bg-mainColor text-white capitalize font-medium rounded-md inline-block  py-2 px-6        section < 7 ? "hidden" : ""
                `}
              >
                submit
              </button>
            )}

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
