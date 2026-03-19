import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from "../SearchBar";

describe("SearchBar",()=>{

    it("toggle expand/collapse and call callback", ()=>{
        const onChangeText = jest.fn();
        const onToggle = jest.fn();

        const {getByTestId, queryByTestId} = render(<SearchBar onChangeText={onChangeText} onToggle={onToggle}/>)

        //initially collapsed
        expect(queryByTestId("search_input_field")).toBeNull();

        //Expand
        fireEvent.press(getByTestId("search_toggle_btn"));
        expect(getByTestId("search_input_field")).not.toBeNull();
        expect(onToggle).toHaveBeenCalledWith(true);

        //Input
        fireEvent.changeText(getByTestId("search_input_field"),"test");
        expect(onChangeText).toHaveBeenCalledWith("test");

        //Close
        fireEvent.press(getByTestId("search_toggle_btn"));
        expect(onChangeText).toHaveBeenCalledWith("");
        expect(queryByTestId("search_input_field")).toBeNull();
        expect(onToggle).toHaveBeenCalledWith(false);


    });

});