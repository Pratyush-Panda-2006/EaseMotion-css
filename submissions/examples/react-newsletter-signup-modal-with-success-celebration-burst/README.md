# Newsletter Signup Modal with Success Celebration Burst

1. **What does this do?**  
   It renders a newsletter subscription modal overlay that validates entries, triggers loading spinners, and shoots an animated particle confetti celebration burst when successfully submitted.

2. **How is it used?**  
   Apply the `.modal-overlay` class on overlay divs and `.modal-card` on modal cards:
   ```html
   <div class="modal-overlay">
     <div class="modal-card">
       <button class="modal-close">&times;</button>
       <form class="modal-form">
         <input type="email" class="form-input" />
       </form>
     </div>
   </div>
   ```

3. **Why is it useful?**  
   It introduces a rewarding micro-interaction celebration that delights users on completion events (like signups) while following modular overlays layouts.
