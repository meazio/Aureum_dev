import React from 'react';



function Tool() {
  return (
    <div class="tool">
        <div class="tool-box">
            <h1>
                <button type="button" id="profile-ico">
                    User
                </button>
            </h1>
            <ul>
                <li>
                    <button type="button">
                        <span class="material-symbols-outlined">
                            notifications
                        </span>
                    </button>
                </li>
                <li>
                    <button type="button">
                        <span class="material-symbols-outlined">
                            bookmark
                        </span>
                    </button>
                </li>
                <li>
                    <button type="button">
                        <span class="material-symbols-outlined">
                            sticky_note_2
                        </span>
                    </button>
                </li>
                <li>
                    <button type="button">
                        <span class="material-symbols-outlined">
                            event_available
                        </span>
                    </button>
                </li>
            </ul>
        </div>
        <button type="button">
            <span class="material-symbols-outlined tool_btn_active">
                push_pin
            </span>
        </button>
    </div>
  );
}

export default Tool;
