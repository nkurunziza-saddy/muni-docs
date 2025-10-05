// [!region import]
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/base-ui/accordion";
// [!endregion import]

// [!region structure]
<Accordion>
  <AccordionItem>
    <AccordionTrigger></AccordionTrigger>
    <AccordionContent></AccordionContent>
  </AccordionItem>
</Accordion>;
// [!endregion structure]

// [!region usage]
export function AccordionComponent() {
  return (
    <Accordion openMultiple={false} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components
          and that can be easily customized.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
// [!endregion usage]
