import React, { useEffect, useState } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import tw from "twrnc";

import Button from "../../../components/button";
import { buyElectricity } from "../../../services/calls";
import Input from "../../../components/input";

const BuyElectricity = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [buyError, setBuyError] = useState("");

  const initialValues = {
    meter_number: "",
    total_amount: 0,
  };
  const validationSchema = Yup.object().shape({
    meter_number: Yup.number().min(6).required("Meter number is required"),
    total_amount: Yup.number().required("amount is required!"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    getFieldProps,
  } = formik;

  const handleSubmit = async () => {
    setLoading(true);
    setBuyError("");
    const res = await buyElectricity(values);
    if (res?.success) {
      navigation.navigate("Token");
      setLoading(false);
    } else {
      setLoading(false);
      setBuyError(res.message);
    }
  };

  return (
    <View style={tw`h-[100%] bg-white  justify-end items-center`}>
      <View
        style={tw`flex flex-row justify-around w-[60] m-auto mb-6 items-center mt-12`}
      >
        <Pressable onPress={() => navigation.navigate("Token")}>
          <View style={tw`mt-4 rounded-sm bg-blue-400 p-2 w-[20]`}>
            <Text style={tw`text-xl text-white text-center`}>Tokens</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Valid")}>
          <View style={tw`mt-4 rounded-sm bg-blue-400 p-2 w-[20] text-center`}>
            <Text style={tw`text-xl text-white text-center `}>Valid</Text>
          </View>
        </Pressable>
      </View>
      <View style={tw`h-[85%] w-full bg-white `}>
        <View style={tw`w-full`}>
          <Text style={tw`text-center font-extrabold text-xl`}>Welcome to</Text>
          <Text style={tw`text-center font-extrabold text-xl`}>
            BuyElectricity System
          </Text>
        </View>

        {buyError.length > 0 && (
          <Text style={tw`mt-4 text-red-500 text-center`}>{buyError}</Text>
        )}
        <View style={tw`mt-8`}>
          <View style={tw`px-6 py-2`}>
            <View style={tw`mt-4`}></View>
            <Input
              Icon={<Feather name="feather" size={24} color="silver" />}
              placeholder="Your Meter number"
              onChangeText={handleChange("meter_number")}
              onBlur={handleBlur("meter_number")}
              value={values.meter_number}
              borderColor={
                touched.meter_number && errors.meter_number ? "red" : "gray"
              }
            />
            {touched.meter_number && errors.meter_number && (
              <Text style={tw`text-red-500`}>{errors.meter_number}</Text>
            )}

            <View style={tw`mt-4`}>
              <Input
                Icon={<Feather name="dollar-sign" size={24} color="silver" />}
                placeholder="Amount"
                security={true}
                onChangeText={handleChange("total_amount")}
                onBlur={handleBlur("total_amount")}
                value={values.total_amount}
                borderColor={
                  touched.total_amount && errors.total_amount ? "red" : "gray"
                }
              />
              {touched.total_amount && errors.total_amount && (
                <Text style={tw`text-red-500`}>{errors.total_amount}</Text>
              )}
            </View>

            <View style={tw`mt-8`}>
              <Button
                mode={"contained"}
                style={tw`bg-[#193074] w-full p-[10] mt-4`}
                onPress={handleSubmit}
                disabled={!isValid || loading}
              >
                {loading ? "Buying ..." : "Buy"}
              </Button>
              <View
                style={tw`flex flex-row justify-around items-center mt-8 w-[60] m-auto`}
              ></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
  },
});
export default BuyElectricity;
