import React from "react";
import renderer from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
// import {act} from "react-dom/test-utils";
const {act} = renderer;

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = renderer.create(<ProfileStatus status="test component status" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("test component status");
    });

    test("after creation input shouldn't be displayed", () => {
        const component = renderer.create(<ProfileStatus status="test component status" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = renderer.create(<ProfileStatus status="test component status" />);
        const root = component.root;
        let span = root.findByType("span");
        act(() => {
            span.props.onDoubleClick();
        });
        let input = root.findByType("input");
        expect(input.props.value).toBe("test component status");
    });
});