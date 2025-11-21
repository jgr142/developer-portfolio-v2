<template>
    <main>
        <form id="contact-form" class="text-sm" @submit.prevent="submitForm">
            <div class="flex flex-col">
                <label for="name-input" class="mb-3">_name:</label>
                <input type="text" id="name-input" name="name" :value="name" @input="$emit('update:name', $event.target.value)" class="p-2 mb-5" required>
            </div>
            <div class="flex flex-col">
                <label for="message-input" class="mb-3">_message:</label>
                <textarea id="message-input" name="message" :value="message" @input="$emit('update:message', $event.target.value)" required></textarea>
            </div>
            <button id="submit-button" type="submit" class="py-2 px-4">submit-message</button>
        </form>
        <CopiedNotification :visible="notification.visible" :message="notification.message" @close="hideNotification" />
    </main>
</template>

<script>
import CopiedNotification from './CopiedNotification.vue';

export default {
    name: 'ContactForm',
    components: {
        CopiedNotification
    },
    props: {
        name: String,
        message: String,
    },
    data() {
        return {
            notification: {
                visible: false,
                message: ''
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.name,
                        message: this.message
                    })
                });

                const result = await response.json();

                if (result.success) {
                    this.showNotification('Your message has been sent!');
                    this.$emit('update:name', '');
                    this.$emit('update:message', '');
                } else {
                    this.showNotification('Failed to send message. Please try again later.', 'error');
                }
            } catch (error) {
                console.error(error);
                this.showNotification('An error occurred. Please try again later.', 'error');
            }
        },
        showNotification(message) {
            this.notification.message = message;
            this.notification.visible = true;
            setTimeout(() => {
                this.hideNotification();
            }, 3000);
        },
        hideNotification() {
            this.notification.visible = false;
        }
    }
}
</script>

<style>
form {
  @apply font-fira_retina text-menu-text;
}
input {
  background-color: #011221;
  border: 2px solid #1e2d3d;
  border-radius: 0px;
}
/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: rgb(190, 190, 190);
  transition: background-color 5000s ease-in-out 0s;
  border: 2px solid #607b96;
}

#message-input {
  background-color: #011221;
  border: 2px solid #1e2d3d;
  border-radius: 0px;
  resize: none;
  height: 150px;
  padding: 10px;
}

#submit-button {
  @apply font-fira_retina text-white text-sm;
  background-color: #1e2d3d;
  border-radius: 0px;
  margin-top: 20px;
  cursor: pointer;
}

#submit-button:hover {
  background-color: #263b50;
}

input:focus,
#message-input:focus {
  outline: none;
  transition: none;
  border: 2px solid #607b96;
  box-shadow: #607b9669 0px 0px 0px 2px;
}

#contact-form {
    max-width: 100%;
    width: 100%;
}

@media (max-width: 1920px) {
    #contact-form {
        max-width: 100%;
        max-height: 400px;
    }
    #submit-button {
        /* width: 100%; */
        font-size: 12px;
    }
    textarea {
        font-size: 13px;
        max-height: 130px !important;
    }
    input {
        font-size: 13px;
    }
}</style>

